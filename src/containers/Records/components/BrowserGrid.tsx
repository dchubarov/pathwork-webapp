import React from "react";
import {Grid} from "@mui/material";
import BrowserCard from "./BrowserCard";
import {CardDto} from "../model";

interface Props {
    preferences: any,
    data: CardDto[];
}

const BrowserGrid: React.FC<Props> = ({preferences, data}) => {
    let widths: number[], clip: number;
    switch (preferences.size) {
        case "small":
            widths = [3, 2];
            clip = 40;
            break;

        case "large":
            widths = [12, 6];
            clip = 160;
            break;

        default:
            widths = [4, 3];
            clip = 80;
    }

    return (
        <Grid container spacing={1} mt={1} mb={1}>
            {data.map((card, index) =>
                <Grid key={`card-${index + 1}`} item xs={widths[0]} md={widths[1]}>
                    <BrowserCard data={card} clip={clip} fullSize/>
                </Grid>
            )}
        </Grid>
    );
}

export default BrowserGrid;
