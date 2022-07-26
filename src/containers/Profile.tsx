import React from "react";
import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";

const Profile = () => {
    const {login} = useParams();

    return (
        <Typography variant="h5">Profile page: {login}</Typography>
    );
}

export default Profile;
