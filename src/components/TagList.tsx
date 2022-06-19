import React from "react";
import {Stack, Typography} from "@mui/material";
import {TagName, TagUsageDto} from "@model/tag";

export interface TagListProps {
    tags?: Array<TagUsageDto | TagName>;
}

const TagList: React.FC<TagListProps> = ({tags}) => {
    return (tags === undefined || tags.length < 1) ? (
        <Typography variant="body2" fontStyle="italic">No tag(s)</Typography>
    ) : (
        <Stack>
            {tags.sort().map((el, index) =>
                <Typography key={`item-${index + 1}`} variant="body2" sx={{flexGrow: 1}}>
                    {typeof el === "string" ? el : `${el.name} (${el.count})`}
                </Typography>
            )}
        </Stack>
    );
}

export default TagList;
