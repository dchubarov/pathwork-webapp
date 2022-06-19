import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import {ApplicationContext} from "@context";
import PostActions from "@feature/Blog/components/PostActions";

const Post: React.FC = () => {
    const {configureView, configureSidebar, ejectView} = useContext(ApplicationContext);
    const {slug} = useParams();

    useEffect(() => {
        configureView("Blog post");
        configureSidebar(<PostActions/>);
        return () => ejectView();
    }, [configureView, configureSidebar, ejectView]);

    return (
        <Typography variant="h4">{slug}</Typography>
    );
}

export default Post;
