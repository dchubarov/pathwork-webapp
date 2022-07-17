import React from "react";
import ReactMarkdown from "react-markdown";
import {Link, Typography} from "@mui/material";
import LinkBehavior from "./LinkBehavior";
import remarkGfm from "remark-gfm";

const MarkdownPreview = ({content}: { content: string }) => {
    return (
        <ReactMarkdown skipHtml
                       children={content}
                       remarkPlugins={[remarkGfm]}
                       components={{
                           a: ({node, ...props}) => <Link component={LinkBehavior} {...props}/>,
                           p: ({node, ...props}) => <Typography variant="inherit" {...props}/>,
                           h1: ({node, ...props}) => <Typography variant="h5" {...props}/>,
                       }}/>
    );
}

export default MarkdownPreview;
