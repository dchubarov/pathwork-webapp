import React, {useState} from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Menu} from "@mui/icons-material";
import {IApplicationContext, ApplicationContext} from "../context";

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
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <IconButton href={process.env.REACT_APP_UI_ROOT || "/"}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>

                    <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                        {section || "Home"}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{pt: 1.5}}>
                <Outlet/>
            </Container>
        </ApplicationContext.Provider>
    );
}

export default App;
