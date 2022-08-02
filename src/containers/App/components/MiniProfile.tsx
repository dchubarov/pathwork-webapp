import React, {useContext} from "react";
import {
    Button,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import LinkBehavior from "@components/LinkBehavior";
import Debug from "@components/Debug";
import {ApplicationContext} from "@utils/context";
import moment from "moment";
import StaffAvatar from "@components/StaffAvatar";
import {formatDateTime} from "@utils/datetime";

interface Props {
    onNavigate?: () => void;
    onLogout?: () => void;
}

const MiniProfile: React.FC<Props> = ({onNavigate, onLogout}) => {
    const {auth} = useContext(ApplicationContext);
    const {t} = useTranslation();

    return (
        <Stack spacing={2} p={2}>
            {auth.user && <>
                <Typography variant="subtitle2">
                    {t("auth.user-info", {user: auth.user.login})}

                    {auth.user.cn && <Typography variant="body2" color="text.secondary">
                        {auth.user.cn}
                    </Typography>}

                    <Link component={LinkBehavior}
                          href={`${process.env.REACT_APP_UI_ROOT}/account/my`}
                          onClick={onNavigate}
                          display="block"
                          variant="body2">
                        {t("auth.user-profile")}
                    </Link>
                </Typography>

                {auth.user.memberOf && auth.user.memberOf.length > 0 &&
                    <Typography variant="subtitle2">
                        {t("auth.user-membership")}

                        <List dense sx={{m: 0, pt: 0, pb: 0, overflow: "auto", maxHeight: 200}}>
                            {auth.user.memberOf.map((item, index) =>
                                <ListItem key={`item-${index + 1}`}>
                                    <ListItemAvatar>
                                        <StaffAvatar name={item.team} kind="team" size="small"/>
                                    </ListItemAvatar>

                                    <ListItemText primary={item.cn || item.team}
                                                  secondary={t(`auth.user-role.${item.role}`)}/>

                                    <ListItemSecondaryAction>
                                        <Switch size="small" defaultChecked/>
                                    </ListItemSecondaryAction>
                                </ListItem>)}
                        </List>
                    </Typography>}
            </>}

            <Debug>{`Session: ${auth.session}`}</Debug>
            <Debug>{`Expires: ${formatDateTime(moment.unix(auth.expires || 0).local(), true)}`}</Debug>

            <Button onClick={onLogout} variant="contained" color="error">
                {t("auth.logout")}
            </Button>
        </Stack>
    );
}

export default MiniProfile;
