import React from "react";
import {AvatarGroup, Box, CircularProgress, Typography} from "@mui/material";
import {ArrowForwardSharp as ArrowRightIcon} from "@mui/icons-material";
import StaffAvatar from "./StaffAvatar";

const maxTeams = 3;
const avatarSize = 24;

interface SharingStatusProps {
    user?: string;
    /** List of teams which a material is shared to */
    teams?: Array<string>;
    loading?: boolean;
    info?: string;
}

const Typo = ({text, bold}: { text: string, bold?: boolean }) => (
    <Typography variant="body2" fontWeight={bold ? "bolder" : "inherit"} sx={{ml: 0.5}}>
        {text}
    </Typography>
);

const SharingStatus = ({user = "unknown", teams, info, loading}: SharingStatusProps) => (
    <Box color="gray" sx={{display: "flex", alignItems: "center"}}>
        {loading === true ? (
            <CircularProgress size={avatarSize} color="inherit"/>
        ) : (
            <>
                <StaffAvatar name={user} kind="user"/>

                <Typo text={user}/>

                {teams && teams.length > 0 &&
                    <>
                        <ArrowRightIcon fontSize="inherit"/>

                        <AvatarGroup>
                            {teams.slice(0, maxTeams).map((team, index) =>
                                <StaffAvatar key={`team-${index + 1}`} name={team} kind="team"/>)}
                        </AvatarGroup>

                        {teams.length > maxTeams &&
                            <StaffAvatar name={`+${teams.length - maxTeams}`} kind="team" placeholder/>}
                    </>}
            </>
        )}

        {(info || loading) &&
            <Typo text={(info || "Loading...")}/>}
    </Box>
);


export default SharingStatus;
