import React, {useEffect, useMemo} from 'react';
import {useTranslation} from "react-i18next";
import {Outlet} from "react-router-dom";
import {AppBar, Box, createTheme, CssBaseline, Link, ThemeProvider, Toolbar, Typography} from "@mui/material";

import {ApplicationContext} from "@utils/context";
import getDesignTokens from "@utils/theme";
import Sidebar from "./Sidebar";
import LinkBehavior from "@components/LinkBehavior";
import AppbarSearchField from "./AppbarSearchField";
import AppbarLogo from "./AppbarLogo";
import AppbarLanguageButton from "./AppbarLanguageButton";
import AppbarThemeButton from "./AppbarThemeButton";
import AppbarDebugButton from "./AppbarDebugButton";
import AppbarLoginButton from "./AppbarLoginButton";
import {useApplicationContextInit} from "../context";

const App: React.FC = () => {
    const context = useApplicationContextInit();
    const {i18n} = useTranslation();

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
