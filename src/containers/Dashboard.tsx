import React, {useContext, useEffect} from "react";
import {Grid, Link, Paper, styled} from "@mui/material";
import {Book as BlogIcon, Dashboard as RecordsIcon} from "@mui/icons-material";
import LinkBehavior from "@components/LinkBehavior";
import {ApplicationContext} from "@utils/context";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();

    useEffect(() => {
        configureView(t("pages.dashboard"));
        return () => {
            ejectView();
        }
    }, [t, configureView, ejectView])

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
                <Widget>
                    <BlogIcon color="primary" fontSize="large"/>
                    <Link variant="h6" component={LinkBehavior} href="blog">{t("pages.blog")}</Link>
                </Widget>
            </Grid>

            <Grid item xs={6}>
                <Widget>
                    <RecordsIcon color="primary" fontSize="large"/>
                    <Link variant="h6" component={LinkBehavior} href="records">{t("pages.records")}</Link>
                </Widget>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
