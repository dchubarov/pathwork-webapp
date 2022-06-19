import React from "react";
import {Box, Tooltip} from "@mui/material";
import {ArrowBack as BackIcon} from "@mui/icons-material";
import RoundedIconButton from "@components/RoundedIconButton";

const PostActions: React.FC = () => {
    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <Tooltip title="Back to entries">
                <RoundedIconButton>
                    <BackIcon/>
                </RoundedIconButton>
            </Tooltip>
        </Box>
    );
};

export default PostActions;
