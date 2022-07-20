import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Outlet} from "react-router-dom";
import {
    AppBar,
    Box,
    createTheme,
    CssBaseline,
    Link,
    PaletteMode,
    ThemeProvider,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";

import {Addon, ApplicationContext, IApplicationContext} from "@utils/context";
import {initPreferences, mergePreferences, PreferenceInit} from "@utils/prefs";
import getDesignTokens from "@utils/theme";
import Sidebar from "./Sidebar";
import LinkBehavior from "@components/LinkBehavior";
import AppbarSearchField from "./AppbarSearchField";
import AppbarLogo from "./AppbarLogo";
import AppbarLanguageButton from "./AppbarLanguageButton";
import AppbarThemeButton from "./AppbarThemeButton";
import AppbarDebugButton from "./AppbarDebugButton";
import AppbarLoginButton from "./AppbarLoginButton";
import axios from "axios";
import moment from "moment";

const developerPrefsInit: any = process.env.NODE_ENV !== "development" ? {} : {
    enableDebugFeatures: () => false,
};

const App: React.FC = () => {
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

        configureView: (caption, search) => {
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

    const theme = useMemo(() => createTheme(
            getDesignTokens(context.preferences.theme)),
        [context.preferences.theme]);

    useEffect(() => {
        if (context.preferences.language !== i18n.language)
            i18n.changeLanguage(context.preferences.language).then();
    }, [i18n, context.preferences.language]);

    return (
        <ApplicationContext.Provider value={context}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <Box sx={{display: "flex"}}>
                    <AppBar position="fixed" sx={{zIndex: theme => theme.zIndex.drawer + 1}}>
                        <Toolbar>
                            <Link component={LinkBehavior} href={process.env.REACT_APP_UI_ROOT || "/"}>
                                <AppbarLogo variant="rounded" src="/logo128.png" alt="logo"/>
                            </Link>

                            <Typography variant="h5" component="div" sx={{flexGrow: 1, ml: 2}}>
                                {context.view.caption || "Home"}
                            </Typography>

                            {context.view.search &&
                                <AppbarSearchField onSearch={context.view.search}
                                                   placeholder={`Search ${context.view.caption}...`}/>}

                            <AppbarLanguageButton i18n={i18n}/>

                            <AppbarThemeButton/>

                            {process.env.NODE_ENV === "development" && <AppbarDebugButton/>}

                            <AppbarLoginButton/>
                        </Toolbar>
                    </AppBar>

                    <Sidebar showCaptions={true} showDividers={false}/>

                    <Box sx={{flexGrow: 1, p: 1}}>
                        <Toolbar/>
                        <Outlet/>
                    </Box>
                </Box>
            </ThemeProvider>
        </ApplicationContext.Provider>
    );
}

export default App;
