import React from "react";
import {Box, Chip} from "@mui/material";

interface TagArrayProps {
    /** Array of tags */
    tags?: Array<string>;
    /** Deletion handler for individual tags */
    onDelete?: (tag: string) => void;
}

/**
 * Displays a row of tags associated with an element such as blog post.
 *
 * @param props the component properties
 * @constructor
 */
const TagArray = (props: TagArrayProps) => {
    if (!props.tags || props.tags.length < 1)
        return null;

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", pb: "0.5em"}}>
            {props.tags.map((t, index) =>
                <Chip key={`tag-${index + 1}`} label={t} variant="outlined"
                      size="small" color="success" sx={{mt: 0.5, mr: 0.5}}
                      onDelete={props.onDelete ? () => (props.onDelete ? props.onDelete(t) : {}) : undefined}/>
            )}
        </Box>
    );
}

export default TagArray;
