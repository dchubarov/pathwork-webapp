import React from "react";
import {Skeleton, Typography} from "@mui/material";

export interface SkeletalContentProps {
    count?: number;
    lines?: number;
}

const SkeletalContent: React.FC<SkeletalContentProps> = ({count = 3, lines = 5}) => {
    if (count < 1) return null;
    return (
        <React.Fragment>
            {[...Array(count).keys()].map(i =>
                <React.Fragment key={`skeletalPost-${i}`}>
                    <Typography variant="h4">
                        <Skeleton width="60%"/>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {lines > 0 && [...Array(lines).keys()].map(j =>
                            <Skeleton key={`skeletalPostLine-${j}`} width={j < lines - 1 ? "100%" : "30%"}/>)}
                    </Typography>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default SkeletalContent;
