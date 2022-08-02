import {useEffect, useState} from "react";
import {PaletteMode, useMediaQuery} from "@mui/material";
import {Addon, IApplicationContext} from "@utils/context";
import {initPreferences, mergePreferences, PreferenceInit} from "@utils/prefs";
import authApi from "@api/auth";
import {useCookies} from "react-cookie";
import moment from "moment";
import {useTranslation} from "react-i18next";

export function useApplicationContextInit(): IApplicationContext {
    const [cookies, setCookie, removeCookie] = useCookies(["session"]);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const {i18n} = useTranslation();

    const [context, setContext] = useState<IApplicationContext>({
        preferences: initPreferences({
            language: new PreferenceInit(i18n.language),
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
            developer: process.env.NODE_ENV !== "development" ? undefined : {
                enableDebugFeatures: () => false,
            }
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
                if (user && password) {
                    if (prev.auth.session) {
                        authApi.logout(prev.auth.session).then();
                    }

                    authApi.login(user, password).then(response => {
                        setCookie("session", response.session, {
                            expires: moment.unix(response.expires).toDate(),
                            path: "/"
                        });

                        setContext(prev1 => ({
                            ...prev1, auth: {
                                ...response,
                                status: "authenticated"
                            }
                        }));
                    });
                } else {
                    if (!cookies.session || cookies.session === prev.auth.session)
                        return prev;

                    authApi.join(cookies.session).then(response => {
                        setContext(prev1 => ({
                            ...prev1, auth: {
                                ...response,
                                status: "authenticated"
                            }
                        }));
                    });
                }

                return {...prev, auth: {status: "in-progress"}};
            });
        },

        logout: () => {
            setContext(prev => {
                if (prev.auth.session) {
                    removeCookie("session");
                    authApi.logout(prev.auth.session).then();
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

    useEffect(() => {
        if (cookies.session && context.auth.status === undefined)
            context.login();

        if (context.preferences.language !== i18n.language)
            i18n.changeLanguage(context.preferences.language).then();
    }, [i18n, context, cookies.session]);

    return context;
}
