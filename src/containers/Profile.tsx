import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import {ApplicationContext} from "@utils/context";

const Profile = () => {
    const [user, setUser] = useState<string | undefined>();
    const {auth} = useContext(ApplicationContext);
    const navigate = useNavigate();
    const {login} = useParams();

    useEffect(() => {
        if (login !== undefined)
            setUser(login);
        else if (auth.status === "authenticated")
            setUser(auth.user?.login);
        else
            navigate("/", {replace: true});
    }, [login, auth, navigate]);

    return (
        <Typography variant="h5">Profile page: {user}</Typography>
    );
}

export default Profile;
