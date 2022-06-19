import React, {useMemo, useState} from 'react';
import {Outlet} from "react-router-dom";
import {ApplicationContext, IApplicationContext, SearchHandler} from "@context";
import Sidebar, {SidebarChild} from "@components/Sidebar";
import LinkBehavior from "@components/LinkBehavior";
import SearchField from "@components/SearchField";
import getDesignTokens from "@utils/theme";
import {
    AppBar,
    Avatar,
    Box,
    createTheme,
    CssBaseline,
    IconButton,
    Link,
    styled,
    ThemeProvider,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery
} from "@mui/material";

// Icons
import {Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon,} from "@mui/icons-material";

const AppLogo = styled(Avatar)(({theme}) => ({
    transition: theme.transitions.create("opacity"),
    opacity: 0.85,
    "&:hover": {
        opacity: 1,
    },
}));

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [paletteMode, setPaletteMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
    const [sidebarChildren, setSidebarChildren] = useState(new Map<number, SidebarChild>());
    const [searchHandler, setSearchHandler] = useState<SearchHandler | undefined>();
    const [section, setSection] = useState<string | undefined>();
    const [appContext] = useState<IApplicationContext>({
        togglePaletteMode: () => {
            setPaletteMode(prev => prev === 'light' ? 'dark' : 'light');
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
        }
    });

    const theme = useMemo(() => createTheme(getDesignTokens(paletteMode)), [paletteMode]);

    return (
        <ApplicationContext.Provider value={appContext}>
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

                            <Tooltip title={paletteMode === 'light' ? "Lights off" : "Lights on"}>
                                <IconButton color="inherit" onClick={() => appContext.togglePaletteMode()}>
                                    {paletteMode === "light" ? <Brightness4Icon/> : <Brightness7Icon/>}
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>

                    <Sidebar children={sidebarChildren}
                             showCaptions={true}
                             showDividers={false}
                    />

                    <Box maxWidth="lg" sx={{flexGrow: 1, p: 1}}>
                        <Toolbar/>
                        <Outlet/>
                    </Box>
                </Box>
            </ThemeProvider>
        </ApplicationContext.Provider>
    );
}

export default App;
