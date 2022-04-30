import React from 'react';
import {AppBar, CssBaseline, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

const App = () => {
    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>

                    <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                        Welcome
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default App;
