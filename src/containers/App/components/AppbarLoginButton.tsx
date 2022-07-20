import React, {useContext} from "react";
import {IconButton, Tooltip} from "@mui/material";
import {Login as LoginIcon} from "@mui/icons-material";
import {ApplicationContext} from "@utils/context";
import StaffAvatar from "@components/StaffAvatar";

const AppbarLoginButton = () => {
    const {auth, login, logout} = useContext(ApplicationContext);

    const handleClick = () => {
        auth.session ? logout() : login("dime", "123");
    }

    return (
        <Tooltip title={auth.user ? auth.user : "Sign-in"}>
            <IconButton color="inherit" onClick={handleClick}>
                {auth.user ? <StaffAvatar name={auth.user} kind="user"/> : <LoginIcon/>}
            </IconButton>
        </Tooltip>
    );
}

export default AppbarLoginButton;
