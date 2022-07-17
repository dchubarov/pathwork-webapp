import React from "react";
import {Typography} from "@mui/material";
import {FeedQuery} from "../reducers/feed";

/**
 * Query status displayed in the feed's Navigator components.
 * @param query current feed query
 * @constructor
 */
const FeedQueryStatus: React.FC<{ query: FeedQuery }> = ({query}) => {
    let queryStatus;

    if ("tags" in query) {
        const tagCount = query.tags.length;
        queryStatus = (<>
            Showing posts with tag{tagCount > 1 && "s"}
            {query.tags.map((tag, index) => (
                <React.Fragment key={`tag-${index + 1}`}>
                    {index > 0 ? ", " : " "}<b>{tag}</b>
                </React.Fragment>
            ))}
        </>);
    } else if ("search" in query) {
        queryStatus = <>Showing posts containing "<b>{query.search}</b>"</>;
    } else {
        queryStatus = "Showing blog posts chronologically";
    }

    return (
        <Typography variant="inherit">
            {queryStatus}
        </Typography>
    );
}

export default FeedQueryStatus;
