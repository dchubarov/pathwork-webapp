import React from "react";

export type SearchHandler = (search: string) => void;

export interface Addon {
    /** Addon caption */
    readonly caption?: string;
    /** Addon component */
    readonly component: JSX.Element;
}

export interface View {
    /** View caption */
    readonly caption?: string;
    /** Function providing search capability */
    readonly search?: SearchHandler;
    /** Add-on views */
    readonly addons?: Map<number, Addon>;
}

export interface Auth {
    /** User name */
    readonly user?: string;
    /** Session identifier */
    readonly session?: string;
    /** Session expiration Unix time */
    readonly expires?: number;
}

export interface IApplicationContext {
    /** System preferences container */
    readonly preferences: any;
    /** Current view context */
    readonly view: View;
    /** Authentication context */
    readonly auth: Auth;

    /** Merges system preferences with init */
    readonly updatePreferences: (init: any) => void;

    /** Login a user with credentials */
    readonly login: (user?: string, password?: string) => void;
    /** Logout current user */
    readonly logout: () => void;

    /** Configure view basic parameters */
    readonly configureView: (caption: string, search?: SearchHandler) => void;
    /** Configure add-on view at specified slot, removes add-on if component is null */
    readonly configureAddon: (component: JSX.Element | null, slot?: number, caption?: string) => void;
    /** Ejects view and its add-ons */
    readonly ejectView: () => void;
}

export const ApplicationContext = React.createContext<IApplicationContext>({
    preferences: {},
    auth: {},
    view: {},
    updatePreferences: () => {},
    login: () => {},
    logout: () => {},
    configureView: () => {},
    configureAddon: () => {},
    ejectView: () => {},
});
