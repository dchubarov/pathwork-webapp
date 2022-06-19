import React from "react";
import {Stack, Typography} from "@mui/material";
import {TagUsageDto} from "@model/tag";

interface Props {
    tags?: Array<string | TagUsageDto>;
}

const TagListSidecar: React.FC<Props> = ({tags}) => {
    const compare = (a: string | TagUsageDto, b: string | TagUsageDto): number => {
        const a0 = typeof a === "string" ? a : a.name;
        const b0 = typeof b === "string" ? b : b.name;
        return a0.localeCompare(b0);
    }

    return (!tags || tags.length < 1) ? (
        <Typography variant="body2" fontStyle="italic">No tag(s)</Typography>
    ) : (
        <Stack>
            {tags.sort(compare).map((el, index) =>
                <Typography key={`item-${index + 1}`} variant="body2">
                    {typeof el === "string" ? el : `${el.name} (${el.count})`}
                </Typography>
            )}
        </Stack>
    );
}

export default TagListSidecar;