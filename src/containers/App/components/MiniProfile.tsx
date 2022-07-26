import React, {useContext} from "react";
import {Button, Link, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import LinkBehavior from "@components/LinkBehavior";
import Debug from "@components/Debug";
import {ApplicationContext} from "@utils/context";
import moment from "moment";

interface Props {
    onNavigate?: () => void;
    onLogout?: () => void;
}

const MiniProfile: React.FC<Props> = ({onNavigate, onLogout}) => {
    const {auth} = useContext(ApplicationContext);
    const {t} = useTranslation();

    return (
        <Stack spacing={2} p={2}>
            {auth.user && <Typography variant="subtitle2">
                {t("auth.user-info", {user: auth.user.login})}
                {auth.user.fullName && <Typography variant="body2" color="text.secondary">
                    {auth.user.fullName}
                </Typography>}
            </Typography>}

            <Link component={LinkBehavior}
                  href={`${process.env.REACT_APP_UI_ROOT}/users/${auth.user?.login}`}
                  onClick={onNavigate}
                  variant="body2">
                {t("auth.user-profile")}
            </Link>

            <Debug>{`Session: ${auth.session}`}</Debug>
            <Debug>{`Expires: ${moment.unix(auth.expires || 0).local()}`}</Debug>

            <Button onClick={onLogout} variant="contained" color="error">
                {t("auth.logout")}
            </Button>
        </Stack>
    );
}

export default MiniProfile;
