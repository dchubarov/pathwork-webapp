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

import {ApplicationContext, IApplicationContext, LoggedOut, SearchHandler} from "@utils/context";
import {initPreferences, mergePreferences, PreferenceInit} from "@utils/prefs";
import getDesignTokens from "@utils/theme";
import Sidebar, {SidebarChild} from "./Sidebar";
import LinkBehavior from "@components/LinkBehavior";
import AppbarSearchField from "./AppbarSearchField";
import AppbarLogo from "./AppbarLogo";
import AppbarLanguageButton from "./AppbarLanguageButton";
import AppbarThemeButton from "./AppbarThemeButton";
import AppbarDebugButton from "./AppbarDebugButton";
import AppbarLoginButton from "./AppbarLoginButton";
import axios from "axios";

const developerPrefsInit: any = process.env.NODE_ENV !== "development" ? {} : {
    enableDebugFeatures: () => false,
};

const App: React.FC = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [sidebarChildren, setSidebarChildren] = useState(new Map<number, SidebarChild>());
    const [searchHandler, setSearchHandler] = useState<SearchHandler | undefined>();
    const [section, setSection] = useState<string | undefined>();
    const {i18n} = useTranslation();

    const [context, setContext] = useState<IApplicationContext>({
        auth: LoggedOut,
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

        login: (user, password) => {
            axios.get<any>(`${process.env.REACT_APP_API_ROOT}/auth/login?u=${user}&p=${password}`)
                .then(response => {
                    setContext(prev => ({
                        ...prev, auth: {
                            isLoggedIn: true,
                            user: response.data.user,
                            session: response.data.session,
                        }
                    }));
                })
        },

        logout: () => {
            axios.get(`${process.env.REACT_APP_API_ROOT}/auth/logout`)
                .then(() => setContext(prev => ({...prev, auth: LoggedOut})));
        },

        configureSidebar: (component, slot, caption) => {
            setSidebarChildren(new Map(sidebarChildren.set(slot || 0, {component: component, caption: caption})));
        },

        configureView: (section, searcher) => {
            setSection(section);
            setSearchHandler(() => searcher);
        },

        ejectView: () => {
            sidebarChildren.clear();
            setSidebarChildren(new Map<number, SidebarChild>());
            setSearchHandler(undefined);
            setSection(undefined);
        },

        updatePreferences: (init) => {
            setContext(prev => {
                const [preferences, changed] = mergePreferences(init, prev.preferences);
                return changed ? {...prev, preferences} : prev;
            });
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
                                {section || "Home"}
                            </Typography>

                            {searchHandler &&
                                <AppbarSearchField onSearch={searchHandler} placeholder={`Search ${section}...`}/>}

                            <AppbarLanguageButton i18n={i18n}/>

                            <AppbarThemeButton/>

                            {process.env.NODE_ENV === "development" && <AppbarDebugButton/>}

                            <AppbarLoginButton/>
                        </Toolbar>
                    </AppBar>

                    <Sidebar children={sidebarChildren}
                             showCaptions={true}
                             showDividers={false}/>

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
