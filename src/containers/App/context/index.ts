import {useState} from "react";
import axios from "axios";
import moment from "moment";
import {PaletteMode, useMediaQuery} from "@mui/material";
import {Addon, IApplicationContext} from "@utils/context";
import {initPreferences, mergePreferences, PreferenceInit} from "@utils/prefs";

const developerPrefsInit: any = process.env.NODE_ENV !== "development" ? {} : {
    enableDebugFeatures: () => false,
};

export function useApplicationContextInit(): IApplicationContext {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [context, setContext] = useState<IApplicationContext>({
        preferences: initPreferences({
            language: new PreferenceInit("en"),
            theme: new PreferenceInit<PaletteMode>(prefersDarkMode ? "dark" : "light"),
            records: {
                browser: {
                    mode: new PreferenceInit("masonry"),
                    size: new PreferenceInit("medium"),
                    sort: {
                        by: new PreferenceInit("updated"),
                        reverse: new PreferenceInit(true),
                    }
                }
            },
            developer: developerPrefsInit
        }),

        view: {},

        auth: {},

        updatePreferences: (init) => {
            setContext(prev => {
                const [preferences, changed] = mergePreferences(init, prev.preferences);
                return changed ? {...prev, preferences} : prev;
            });
        },

        login: (user, password) => {
            setContext(prev => {
                if (prev.auth.session) {
                    // TODO logout previous session
                }

                axios.get<any>(`${process.env.REACT_APP_API_ROOT}/auth/login?u=${user}&p=${password}`)
                    .then(response => {
                        setContext(prev1 => ({
                            ...prev1, auth: {
                                user: response.data.user,
                                session: response.data.session,
                                expires: moment().unix() + 3600,
                            }
                        }));
                    });

                return prev;
            });
        },

        logout: () => {
            setContext(prev => {
                if (prev.auth.session) {
                    axios.get(`${process.env.REACT_APP_API_ROOT}/auth/logout?s=${prev.auth.session}`).then();
                    return {...prev, auth: {}};
                }

                return prev;
            });
        },

        configureView: (search, caption) => {
            setContext(prev => ({
                ...prev, view: {
                    caption,
                    search
                }
            }));
        },

        configureAddon: (component, slot, caption) => {
            setContext(prev => {
                const addons = new Map<number, Addon>(prev.view.addons);
                if (component !== null) {
                    return {
                        ...prev, view: {
                            ...prev.view, addons: addons
                                .set(slot || 0, {component, caption})
                        }
                    };
                } else {
                    if (addons.delete(slot || 0))
                        return {...prev, view: {...prev.view, addons}};
                }

                return prev;
            });
        },

        ejectView: () => {
            setContext(prev => ({...prev, view: {}}));
        }
    });

    return context;
}
