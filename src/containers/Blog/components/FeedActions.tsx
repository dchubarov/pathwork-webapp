import React from "react";
import {Create as CreateIcon, Refresh as RefreshIcon} from "@mui/icons-material";
import {Badge, Box, Button, CircularProgress, Tooltip} from "@mui/material";
import RoundedIconButton from "@components/RoundedIconButton";

interface Props {
    loading?: boolean;
    unread?: boolean;
}

const FeedActions: React.FC<Props> = ({loading, unread}) => {
    const recentPostsChild = (
        <RefreshIcon/>
    );

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            {loading ? (
                <RoundedIconButton disabled>
                    <CircularProgress disableShrink size={18} thickness={5} color="inherit" sx={{m: "3px"}}/>
                </RoundedIconButton>
            ) : (
                <Tooltip title="Recent posts">
                    <RoundedIconButton>
                        {unread ? (
                            <Badge color="info" variant="dot" anchorOrigin={{vertical: "top", horizontal: "left"}}>
                                {recentPostsChild}
                            </Badge>
                        ) : (
                            recentPostsChild
                        )}
                    </RoundedIconButton>
                </Tooltip>
            )}

            <Button color="success"
                    variant={loading ? "text" : "contained"}
                    disabled={loading}
                    endIcon={loading ? null : <CreateIcon/>}
                    sx={{flexGrow: 1, ml: 0.5}}>
                {loading ? "Loading..." : "New post"}
            </Button>
        </Box>
    );
}

export default FeedActions;