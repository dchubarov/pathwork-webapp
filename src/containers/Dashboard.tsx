import React, {useContext, useEffect} from "react";
import {Grid, Link, Paper, styled, Typography} from "@mui/material";
import {Book as BlogIcon} from "@mui/icons-material";
import LinkBehavior from "@components/LinkBehavior";
import {ApplicationContext} from "@context";

const Widget = styled(Paper)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.utility.background,
    color: theme.palette.utility.text,
    padding: theme.spacing(1),
    ...theme.typography.body1,
}));

const Dashboard = () => {
    const {configureView, ejectView} = useContext(ApplicationContext);

    useEffect(() => {
        configureView("Dashboard");
        return () => {
            ejectView();
        }
    }, [configureView, ejectView])

    return (
        <>
            <Typography variant="h5">Dashboard</Typography>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                    <Widget>
                        <BlogIcon color="primary" fontSize="large"/>
                        <Link variant="h6" component={LinkBehavior} href="blog">Blog</Link>
                    </Widget>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
