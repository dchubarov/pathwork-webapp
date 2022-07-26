import React, {useContext, useEffect, useState} from "react";
import {IconButton, Popover} from "@mui/material";
import {PersonOff as LoginIcon} from "@mui/icons-material";

import {ApplicationContext} from "@utils/context";
import StaffAvatar from "@components/StaffAvatar";
import LoginForm from "./LoginForm";
import MiniProfile from "./MiniProfile";

const popoverPaperProps = {
    elevation: 0,
    sx: {
        minWidth: 240,
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,
        "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        "&:before": {
            content: "\"\"",
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
    },
};

const AppbarLoginButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const {auth, login, logout} = useContext(ApplicationContext);

    const popoverActive = Boolean(anchorEl);
    const popoverId = popoverActive ? "login-form-popover" : undefined;
    const handleClosePopover = () => setAnchorEl(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleLogin = (username: string, password: string) => login(username, password);
    const handleLogout = () => {
        handleClosePopover();
        logout();
    }

    useEffect(() => {
        // hide pop-over when successfully authenticated
        auth.status === "authenticated" && handleClosePopover();
    }, [auth.status]);

    return (
        <>
            <IconButton color="inherit" disabled={auth.status === "in-progress"} onClick={handleClick}>
                {auth.status === "authenticated" && auth.user ? <StaffAvatar name={auth.user.login}/> : <LoginIcon/>}
            </IconButton>

            <Popover id={popoverId} anchorEl={anchorEl} open={popoverActive} onClose={handleClosePopover}
                     anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                     transformOrigin={{vertical: "top", horizontal: "right"}}
                     PaperProps={popoverPaperProps}>

                {(auth.status === undefined || auth.status === "in-progress") &&
                    <LoginForm onSubmit={handleLogin} progress={auth.status === "in-progress"}/>}

                {auth.status === "authenticated" &&
                    <MiniProfile onNavigate={handleClosePopover} onLogout={handleLogout}/>}

            </Popover>
        </>
    );
}

export default AppbarLoginButton;
