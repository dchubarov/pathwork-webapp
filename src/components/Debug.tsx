import React from "react";
import {Box, Typography} from "@mui/material";
import {PestControl as DebugIcon} from "@mui/icons-material";
import {usePreference} from "@utils/prefs";

const Debug: React.FC<{ children?: React.ReactNode }> = ({children}) => {
    const [enabled] = usePreference("developer.enableDebugFeatures", false);
    if (process.env.NODE_ENV !== "development" || !enabled)
        return null;

    return (
        <Box sx={{display: "flex", alignItems: "center", pt: 1}}>
            <DebugIcon color="error"/>
            <Typography variant="h6" color="error" ml={1}>
                {children}
            </Typography>
        </Box>
    )
}

export default Debug;
