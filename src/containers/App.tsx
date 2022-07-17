import React, {useEffect, useMemo, useState} from 'react';
import {Outlet} from "react-router-dom";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    createTheme,
    CssBaseline,
    IconButton,
    Link,
    PaletteMode,
    styled,
    ThemeProvider,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery
} from "@mui/material";
import {ApplicationContext, IApplicationContext, SearchHandler} from "@utils/context";
import Sidebar, {SidebarChild} from "@components/Sidebar";
import LinkBehavior from "@components/LinkBehavior";
import SearchField from "@components/SearchField";
import getDesignTokens from "@utils/theme";
import {initPreferences, mergePreferences, PreferenceInit, usePreference} from "@utils/prefs";

// Icons
import {
    Brightness4 as DarkThemeIcon,
    Brightness7 as LightThemeIcon,
    Language as LanguageIcon,
    PestControl as DebugOnIcon,
    PestControlOutlined as DebugOffIcon
} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {i18n} from "i18next";

const AppLogo = styled(Avatar)(({theme}) => ({
    transition: theme.transitions.create("opacity"),
    opacity: 0.85,
    "&:hover": {
        opacity: 1,
    },
}));

const AppBarLanguageButton: React.FC<{ i18n: i18n, mode?: "cycle" | "menu" | "auto" }> = ({i18n, mode = "auto"}) => {
    const [preferredLanguage, setPreferredLanguage] = usePreference("language");
    const availableLanguageCount = i18n.languages.length;

    const handleClick = () => {
        if (mode === "cycle" || (mode === "auto" && availableLanguageCount < 3)) {
            const i = i18n.languages.findIndex(l => preferredLanguage === l);
            if (i !== -1) {
                const nextLanguage = i18n.languages[i < i18n.languages.length - 1 ? i + 1 : 0];
                setPreferredLanguage(nextLanguage);
            }
        } else {
            // TODO show language menu
        }
    }

    return (
        <IconButton color="inherit" onClick={handleClick} disabled={availableLanguageCount < 2}>
            <Badge badgeContent={i18n.t("language.label").toString().toLowerCase()}
                   anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                   color="success">
                <LanguageIcon/>
            </Badge>
        </IconButton>
    );
}

const AppBarThemeButton = () => {
    const [theme, setTheme] = usePreference<PaletteMode>("theme");
    return (
        <Tooltip title={theme === 'light' ? "Lights off" : "Lights on"}>
            <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} color="inherit" sx={{ml: 1}}>
                {theme === "light" ? <LightThemeIcon/> : <DarkThemeIcon/>}
            </IconButton>
        </Tooltip>
    );
}

const AppBarDebugButton = () => {
    const [enableDebugFeatures, setEnableDebugFeatures] = usePreference("developer.enableDebugFeatures");
    return (
        <Tooltip title={`${enableDebugFeatures ? "Disable" : "Enable"} debug features`}>
            <IconButton color="inherit" onClick={() => setEnableDebugFeatures(!enableDebugFeatures)}>
                {enableDebugFeatures ? <DebugOnIcon/> : <DebugOffIcon/>}
            </IconButton>
        </Tooltip>
    );
}

const developerPrefsInit: any = process.env.NODE_ENV !== "development" ? {} : {
    enableDebugFeatures: () => false,
};

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [sidebarChildren, setSidebarChildren] = useState(new Map<number, SidebarChild>());
    const [searchHandler, setSearchHandler] = useState<SearchHandler | undefined>();
    const [section, setSection] = useState<string | undefined>();
    const {t, i18n} = useTranslation("common");

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

        updatePreferences: (init, prefs) => {
            const [preferences, changed] = mergePreferences(init, prefs);
            if (changed) setContext(prev => ({...prev, preferences}));
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
                                <AppLogo variant="rounded" src="/logo128.png" alt="logo"/>
                            </Link>

                            <Typography variant="h5" component="div" sx={{flexGrow: 1, ml: 2}}>
                                {section || "Home"}
                            </Typography>

                            {searchHandler &&
                                <SearchField onSearch={searchHandler} placeholder={`Search ${section}...`}/>}

                            <AppBarLanguageButton i18n={i18n}/>

                            <AppBarThemeButton/>

                            {process.env.NODE_ENV === "development" && <AppBarDebugButton/>}
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
