import React from "react";
import {Divider, IconButton, Link, Paper, SxProps, Typography} from "@mui/material";
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from "@mui/icons-material";

import LinkBehavior from "@components/LinkBehavior";

interface Props {
    mode?: "normal" | "sticky"
    pageNumber: number,
    totalPages: number,
    status?: string | JSX.Element;
    onPageChange?: (page: number) => void;
}

const FeedNavigator = React.forwardRef<any, Props>(({
                                                        mode = "normal",
                                                        pageNumber,
                                                        totalPages,
                                                        status,
                                                        onPageChange
                                                    }, ref) => {

    const floaterSxProps: Partial<SxProps> = mode === "sticky" ? {
        position: "sticky",
        bottom: "1ch",
    } : {};

    return (
        <Paper ref={ref}
               elevation={1}
             sx={{
                 p: 1,
                 display: "flex",
                 alignItems: "center",
                 borderRadius: 2,
                 backgroundColor: theme => theme.palette.utility.background,
                 color: theme => theme.palette.utility.text,
                 ...floaterSxProps
             }}>
            <IconButton size="small"
                        disabled={pageNumber <= 1}
                        onClick={() => onPageChange && onPageChange(pageNumber - 1)}>
                <ChevronLeftIcon fontSize="inherit"/>
            </IconButton>

            <IconButton size="small"
                        disabled={pageNumber >= totalPages}
                        onClick={() => onPageChange && onPageChange(pageNumber + 1)}>
                <ChevronRightIcon fontSize="inherit"/>
            </IconButton>

            <Link component={LinkBehavior} underline="always" variant="body2" href="#"
                  sx={{
                      ml: 0.5,
                      mr: 1,
                      flexWrap: "nowrap",
                      textAlign: "center",
                      textDecorationStyle: "dashed",
                  }}>Page {pageNumber || 0} of {totalPages || 0}</Link>

            <Divider orientation="vertical" variant="middle" flexItem/>

            <Typography variant="body2" sx={{flexGrow: 1, ml: 1}}>{status}</Typography>

            {mode === "sticky" && <IconButton size="small"
                                              onClick={() => window.scrollTo({behavior: "smooth", top: 0})}>
                <KeyboardArrowUpIcon fontSize="inherit"/>
            </IconButton>}
        </Paper>
    );
});

export default FeedNavigator;
