import {useContext} from "react";
import {ApplicationContext} from "./context";

export type PreferenceValue<T> = T | (() => T | null) | null;
export type PreferenceUpdateFunc<T> = (v: PreferenceValue<T>) => void;

const ToNullFunc = () => null;
const ToFalseFunc = () => false;
const PathSeparator = /[./]/;

export class PreferenceInit<T> {
    readonly def: PreferenceValue<T> | undefined;

    constructor(def?: PreferenceValue<T>) {
        this.def = def === null ? ToNullFunc : def;
    }
}

/**
 * Hook returning a preference value along with function allowing change of the value.
 *
 * @param key preference key
 */
export function usePreference<T = any>(key: string): [T, PreferenceUpdateFunc<T>] {
    const {preferences, updatePreferences} = useContext(ApplicationContext);
    const update: PreferenceUpdateFunc<T> = (v) => {
        let initRoot: any = {}, init = initRoot;
        splitPreferenceKey(key).forEach((path, index, paths) => {
            if (index < paths.length - 1) {
                init[path] = {};
                init = init[path];
            } else {
                init[path] = v;
            }
        });
        updatePreferences(initRoot);
    };

    return [findPreferenceValue(key, preferences), update];
}

/**
 * Hook returning a subset of context preferences as plain object.
 *
 * @param keyPrefix key prefix
 */
export function useReadonlyPreferences(keyPrefix: string) {
    const {preferences} = useContext(ApplicationContext);
    let child = preferences;
    splitPreferenceKey(keyPrefix).forEach(path => child = (child !== undefined ? child[path] : undefined));
    if (!child) throw new Error("keyPrefix contains invalid property path: " + keyPrefix);
    return child;
}

export function findPreferenceValue<T>(key: string, prefs: any): T {
    if (!prefs || typeof prefs !== "object" || Array.isArray(prefs))
        throw new Error("prefs must be a regular object");

    let leaf = prefs, parent = null;
    for (const path of splitPreferenceKey(key)) {
        if (path in leaf) {
            parent = leaf;
            leaf = leaf[path];
        } else {
            leaf = null;
            break;
        }
    }

    if (leaf === null || parent == null) throw new Error("Preference key contains invalid path: " + key);
    return leaf;
}

export function mergePreferences(init: any, prefs?: any): [any, boolean] {
    if (!init || typeof init !== "object" || Array.isArray(init))
        throw new Error("init must be a regular object");

    if (prefs === undefined)
        prefs = {};
    else {
        if (prefs === null || typeof prefs !== "object" || Array.isArray(prefs))
            throw new Error("prefs must be a regular object");
    }

    let changes: any = {};
    let hasChanges = false;
    for (const prop in init) {
        const initEl = init[prop];
        let valueProvider;

        if (initEl === null)
            valueProvider = ToNullFunc;
        else if (initEl === false)
            valueProvider = ToFalseFunc;
        else if (typeof initEl === "object") {
            if (initEl instanceof PreferenceInit)
                valueProvider = initEl.def;
            else {
                const [sub, subChanges] = mergePreferences(initEl, prop in prefs ? prefs[prop] : {});
                if (subChanges) {
                    changes[prop] = sub;
                    hasChanges = true;
                }
            }
        } else {
            valueProvider = initEl;
        }

        if (valueProvider) {
            const value = typeof valueProvider === "function" ? valueProvider() : valueProvider;
            valueProvider = undefined;

            if (!(prop in prefs) || !Object.is(prefs[prop], value)) {
                changes[prop] = value;
                hasChanges = true;
            }
        }
    }

    return [hasChanges ? {...prefs, ...changes} : prefs, hasChanges];
}

export function initPreferences(init: any) {
    return mergePreferences(init)[0];
}

function splitPreferenceKey(key: string): string[] {
    return key.split(PathSeparator).map(path => path.trim()).filter(path => path.length > 0);
}
