import React from "react";
import {Masonry} from "@mui/lab";
import BrowserCard from "@feature/Records/components/BrowserCard";
import {CardDto} from "@model/records";

interface Props {
    preferences: any,
    data: CardDto[]
}

const BrowserMasonry: React.FC<Props> = ({preferences, data}) => {
    let columns, clip: number;
    switch (preferences.size) {
        case "small":
            columns = 4;
            clip = 140;
            break;
        case "large":
            columns = 2;
            clip = 560;
            break;
        case "medium":
        default:
            columns = 3;
            clip = 280;
    }

    return (
        <Masonry columns={columns} spacing={1} sx={{mt: 1}}>
            {data.map((card, index) =>
                <BrowserCard key={`card-${index + 1}`} clip={clip} data={card}/>)}
        </Masonry>
    );
}

export default BrowserMasonry;
