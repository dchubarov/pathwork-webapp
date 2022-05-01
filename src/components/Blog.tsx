import React, {useContext, useEffect} from "react";
import {Typography} from "@mui/material";
import {ApplicationContext} from "../context";

const Blog = () => {
    const {configureView, ejectView} = useContext(ApplicationContext);

    useEffect(() => {
        configureView("Blog");

        return () => {
            ejectView();
        }
    }, [configureView, ejectView]);

    return (
        <Typography variant="h5">Top blog post...</Typography>
    );
}

export default Blog;
