import React from "react";
import {Box, CircularProgress, IconButton, Typography} from "@mui/material";
import {ChevronLeft as PreviousYearIcon, ChevronRight as NextYearIcon} from "@mui/icons-material";
import {MAX_YEAR, MIN_YEAR} from "../reducers/calendar";

interface Props {
    year: number;
    loading?: boolean;
}

const YearSelector: React.FC<Props> = ({year, loading}) => {
    return (
        <Box color="text.secondary" sx={{display: "flex", alignItems: "center"}}>
            <IconButton disabled={loading || year <= MIN_YEAR}>
                <PreviousYearIcon fontSize="inherit"/>
            </IconButton>

            <Typography ml={1} mr={1} fontWeight="bolder">
                {year}
            </Typography>

            <IconButton disabled={loading || year >= MAX_YEAR}>
                <NextYearIcon fontSize="inherit"/>
            </IconButton>

            {loading && <CircularProgress color="inherit" size="1rem" disableShrink/>}
        </Box>
    );
}

export default YearSelector;
