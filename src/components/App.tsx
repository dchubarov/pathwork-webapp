import React, {forwardRef, useMemo, useState} from 'react';
import {Link as RouterLink, LinkProps as RouterLinkProps, Outlet} from "react-router-dom";
import {IApplicationContext, ApplicationContext} from "../context";
import Sidebar, {SidebarChild} from "./Sidebar";
import {
    AppBar, Avatar, Box,
    createTheme, CssBaseline, IconButton,
    ThemeProvider,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";

// Icons
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

const LinkBehavior = forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
    (props, ref) => {
        const {href, ...other} = props;
        // Map href (MUI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    });

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [paletteMode, setPaletteMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
    const [sidebarChildren, setSidebarChildren] = useState(new Map<number, SidebarChild>());
    const [section, setSection] = useState<string | undefined>();
    const [appContext] = useState<IApplicationContext>({
        togglePaletteMode: () => {
            setPaletteMode(prev => prev === 'light' ? 'dark' : 'light');
        },

        configureSidebar: (component, slot, caption) => {
            setSidebarChildren(new Map(sidebarChildren.set(slot || 0, {component: component, caption: caption})));
        },

        configureView: (section) => {
            setSection(section);
        },

        ejectView: () => {
            setSidebarChildren(new Map<number, SidebarChild>());
            setSection(undefined);
        }
    });

    const theme = useMemo(() => createTheme({
        palette: {
            mode: paletteMode,
        },

        components: {
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehavior,
                    disableRipple: true,
                }
            }
        }
    }), [paletteMode]);

    return (
        <ApplicationContext.Provider value={appContext}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>

                <Box sx={{display: "flex"}}>
                    <AppBar position="fixed" sx={{zIndex: theme => theme.zIndex.drawer + 1}}>
                        <Toolbar>
                            <IconButton href={process.env.REACT_APP_UI_ROOT || "/"} size="medium" edge="start">
                                <Avatar variant="rounded" src="/logo128.png" alt="logo"/>
                            </IconButton>

                            <Typography variant="h5" component="div" sx={{flexGrow: 1, ml: 2}}>
                                {section || "Home"}
                            </Typography>

                            <IconButton color="inherit" onClick={() => appContext.togglePaletteMode()}>
                                {paletteMode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Sidebar children={sidebarChildren} showCaptions={true} showDividers={true}/>

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
