import React, {useState} from 'react';
import {AppBar, Container, createTheme, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink, LinkProps as RouterLinkProps, Outlet} from "react-router-dom";
import {Menu as MenuIcon} from "@mui/icons-material";
import {IApplicationContext, ApplicationContext} from "../context";

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
    (props, ref) => {
        const {href, ...other} = props;
        // Map href (MUI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    });

const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            }
        }
    }
});

const App = () => {
    const [section, setSection] = useState<string | undefined>();
    const [appContext] = useState<IApplicationContext>({
        configureView: (section) => {
            setSection(section);
        },

        ejectView: () => {
            setSection(undefined);
        }
    });

    return (
        <ApplicationContext.Provider value={appContext}>
            <ThemeProvider theme={theme}>
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton href={process.env.REACT_APP_UI_ROOT || "/"} size="large" edge="start"
                                    color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                            {section || "Home"}
                        </Typography>
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
