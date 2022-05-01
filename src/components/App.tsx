import React, {useState} from 'react';
import {Link as RouterLink, LinkProps as RouterLinkProps, Outlet} from "react-router-dom";
import {IApplicationContext, ApplicationContext} from "../context";
import {
    AppBar,
    Container,
    createTheme,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography,
    useMediaQuery
} from "@mui/material";
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
    Menu as MenuIcon
} from "@mui/icons-material";

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
    (props, ref) => {
        const {href, ...other} = props;
        // Map href (MUI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    });

const App = () => {
    const [section, setSection] = useState<string | undefined>();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [paletteMode, setPaletteMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
    const [appContext] = useState<IApplicationContext>({
        togglePaletteMode: () => {
            setPaletteMode(prev => prev === 'light' ? 'dark' : 'light');
        },

        configureView: (section) => {
            setSection(section);
        },

        ejectView: () => {
            setSection(undefined);
        }
    });

    const theme = React.useMemo(() => createTheme({
        palette: {
            mode: paletteMode,
        },

        components: {
            MuiButtonBase: {
                defaultProps: {
                    LinkComponent: LinkBehavior,
                }
            }
        }
    }), [paletteMode]);

    return (
        <ApplicationContext.Provider value={appContext}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton href={process.env.REACT_APP_UI_ROOT || "/"} size="large" edge="start"
                                    color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                            {section || "Home"}
                        </Typography>

                        <IconButton color="inherit" onClick={() => appContext.togglePaletteMode()}>
                            {paletteMode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="lg" sx={{pt: 1.5}}>
                    <Outlet/>
                </Container>
            </ThemeProvider>
        </ApplicationContext.Provider>
    );
}

export default App;
