import React from "react";
import {Avatar} from "@mui/material";

const largeAvatar = 32;
const smallAvatar = 24;

interface Props {
    name: string;
    kind?: "user" | "team";
    size?: "small" | "large";
    placeholder?: boolean;
}

const StaffAvatar: React.FC<Props> = ({name, kind = "user", size = "small"}) => {
    return (
        <Avatar src={`${process.env.REACT_APP_UPLOADS_ROOT}/avatar/${kind}/${name}.png`}
                variant={kind === "team" ? "rounded" : "circular"}
                alt={name}
                sx={{
                    height: size === "small" ? smallAvatar : largeAvatar,
                    width: size === "small" ? smallAvatar : largeAvatar,
                    fontSize: size === "small" ? "small" : "inherit",
                }}/>
    );
}

export default StaffAvatar;
