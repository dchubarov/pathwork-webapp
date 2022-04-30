import React from 'react';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Menu} from "@mui/icons-material";

const App = () => {
    return (
        <React.Fragment>
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
                        Welcome
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{pt: 1.5}}>
                <Outlet/>
            </Container>
        </React.Fragment>
    );
}

export default App;
