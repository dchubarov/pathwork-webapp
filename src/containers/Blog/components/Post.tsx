import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import {ApplicationContext} from "@utils/context";
import PostActions from "@feature/Blog/components/PostActions";

const Post: React.FC = () => {
    const {configureView, configureAddon, ejectView} = useContext(ApplicationContext);
    const {slug} = useParams();

    useEffect(() => {
        configureView("Blog post");
        configureAddon(<PostActions/>);
        return () => ejectView();
    }, [configureView, configureAddon, ejectView]);

    return (
        <Typography variant="h4">{slug}</Typography>
    );
}

export default Post;
