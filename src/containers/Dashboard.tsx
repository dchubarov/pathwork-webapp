import React, {useContext, useEffect} from "react";
import {Grid, Icon, Link, Paper, styled} from "@mui/material";
import {Book as BlogIcon, CalendarMonthOutlined as PanoramaIcon, Dashboard as RecordsIcon} from "@mui/icons-material";
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

const allWidgets = [
    {
        path: "blog",
        icon: BlogIcon,
    },
    {
        path: "records",
        icon: RecordsIcon,
    },
    {
        path: "panorama",
        icon: PanoramaIcon,
    }
];

const Dashboard = () => {
    const {ejectView} = useContext(ApplicationContext);
    const {t} = useTranslation();

    useEffect(() => {
        return () => {
            ejectView();
        }
    }, [ejectView])

    return (
        <Grid container spacing={2} mt={1}>
            {allWidgets.map((w, index) => (
                <Grid key={`widget-${index + 1}`} xs={6} item>
                    <Widget>
                        <Icon component={w.icon} color="primary" fontSize="large"/>
                        <Link variant="h6" component={LinkBehavior} href={w.path} ml={1}>
                            {t(`pages.${w.path}`)}
                        </Link>
                    </Widget>
                </Grid>))}
        </Grid>
    );
};

export default Dashboard;
