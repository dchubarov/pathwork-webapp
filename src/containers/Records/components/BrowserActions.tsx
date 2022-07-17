import React from "react";
import {Box, IconButton, Tooltip} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";

/**
 * Record browser main actions' sidecar.
 * @constructor
 */
const BrowserActions: React.FC = () => {
    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <Tooltip title="Create new">
                <IconButton>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
        </Box>
    );
}

export default BrowserActions;
