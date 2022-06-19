import React from "react";
import {Avatar} from "@mui/material";
import {Person as UserIcon} from "@mui/icons-material";

const largeAvatar = 32;
const smallAvatar = 24;

interface StaffAvatarProps {
    name: string;
    kind: "user" | "team";
    size?: "small" | "large";
    placeholder?: boolean;
}

const StaffAvatar = ({name, kind, size = "small"}: StaffAvatarProps) => {
    return (
        <Avatar alt={name}
                variant={kind === "team" ? "rounded" : "circular"}
                sx={{
                    height: size === "small" ? smallAvatar : largeAvatar,
                    width: size === "small" ? smallAvatar : largeAvatar,
                    fontSize: size === "small" ? "small" : "inherit",
                }}>
            {kind === "user" ? <UserIcon fontSize="inherit"/> : name}
        </Avatar>
    );
}

export default StaffAvatar;
