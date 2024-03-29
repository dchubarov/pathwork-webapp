import React, {useMemo} from 'react';
import {useTranslation} from "react-i18next";
import {Outlet, useLocation} from "react-router-dom";
import {AppBar, Box, createTheme, CssBaseline, Link, ThemeProvider, Toolbar, Typography} from "@mui/material";

import {ApplicationContext} from "@utils/context";
import {useApplicationContextInit} from "../context";
import getDesignTokens from "@utils/theme";
import LinkBehavior from "@components/LinkBehavior";
import AppbarSearchField from "./AppbarSearchField";
import AppbarLanguageButton from "./AppbarLanguageButton";
import AppbarThemeButton from "./AppbarThemeButton";
import AppbarDebugButton from "./AppbarDebugButton";
import AppbarLoginButton from "./AppbarLoginButton";
import AppbarLogo from "./AppbarLogo";
import Sidebar from "./Sidebar";

const App: React.FC = () => {
    const context = useApplicationContextInit();
    const {i18n} = useTranslation();
    const location = useLocation();

    const guessViewCaption = (prefix: string = "pages"): string | undefined => {
        let paths = location.pathname.split("/", 3)
            .map(p => p.trim())
            .filter(p => p.length > 0);

        let translationKeys = [];
        if (paths.length < 1)
            translationKeys.push(`${prefix}.root`);
        else {
            do {
                translationKeys.push(`${prefix}.${paths.join("-")}`);
                paths = paths.slice(0, paths.length - 1);
            } while (paths.length > 0);
        }

        return i18n.t(translationKeys);
    }

    const theme = useMemo(() => createTheme(
            getDesignTokens(context.preferences.theme)),
        [context.preferences.theme]);

    return (
        <ApplicationContext.Provider value={context}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <Box sx={{display: "flex"}}>
                    <AppBar position="fixed" sx={{zIndex: theme => theme.zIndex.drawer + 1}}>
                        <Toolbar>
                            <Link component={LinkBehavior} href="/">
                                <AppbarLogo variant="rounded" src="/logo128.png" alt="logo"/>
                            </Link>

                            <Typography variant="h5" component="div" sx={{flexGrow: 1, ml: 2}}>
                                {context.view.caption || guessViewCaption() || `[${location.pathname}]`}
                            </Typography>

                            {context.view.search &&
                                <AppbarSearchField onSearch={context.view.search}
                                                   placeholder={guessViewCaption("search") || `Search ${location.pathname}`}/>}

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
