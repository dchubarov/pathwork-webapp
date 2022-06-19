import React, {useContext, useEffect, useReducer, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Button, Link, Slide, Stack, Typography} from "@mui/material";
import {ChatBubbleOutline as CommentsIcon, Warning as WarningIcon} from "@mui/icons-material";
import axios from "axios";

import {BlogPageDto} from "@model/blog";
import {ApplicationContext} from "@context";
import {formatDateTime} from "@utils/datetime";
import FeedActions from "./FeedActions";
import SkeletalContent from "@components/SkeletalContent";
import MarkdownPreview from "@components/MarkdownPreview";
import SharingStatus from "@components/SharingStatus";
import TagArray from "@components/TagArray";
import OnScreen from "@components/OnScreen";
import LinkBehavior from "@components/LinkBehavior";

import {FeedState, queryToSearchParams} from "../reducers/feed";
import TagListSidecar from "./TagListSidecar";
import FeedNavigator from "./FeedNavigator";

const Feed: React.FC = () => {
    const {configureView, configureSidebar, ejectView} = useContext(ApplicationContext);
    const [state, dispatch] = useReducer(FeedState.reducer, FeedState.initial);
    const [scrolledDown, setScrolledDown] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSetPage = (page: number) => setSearchParams({...queryToSearchParams(state.query), p: page});

    useEffect(() => {
        configureView("Blog", search => setSearchParams({s: search}));
        return () => ejectView();
    }, [configureView, configureSidebar, ejectView, setSearchParams]);

    useEffect(() => {
        dispatch({type: "apply-search-params", searchParams: searchParams});
    }, [searchParams]);

    useEffect(() => {
        switch (state.mode) {
            case "reload":
                configureSidebar(<FeedActions loading/>);
                axios.get<BlogPageDto>(process.env.REACT_APP_API_ROOT + `/blog/recent?p=${state.query.page || 1}`)
                    .then(response => dispatch({type: "page-loaded", data: response.data}))
                    .catch(() => dispatch({type: "page-error"}));
                break;

            case "loaded":
            case "loaded-nodata":
                configureSidebar(<FeedActions/>);
                configureSidebar(<TagListSidecar tags={state.data?.availableTags || []}/>, 2, "Tags");
                break;
        }
    }, [state, configureSidebar]);

    let status;
    if ("tags" in state.query) {
        const len = state.query.tags.length;
        status = (
            <>
                Showing posts with tag{len > 1 ? "s" : ""}
                {state.query.tags.map((t, i) => (
                    <React.Fragment key={`item-${i + 1}`}>
                        "<b>{t}</b>"{i < len - 1 ? ", " : ""}
                    </React.Fragment>))}
            </>);
    } else if ("search" in state.query) {
        status = <>Showing posts containing "<b>{state.query.search}</b>"</>;
    } else {
        status = "Showing blog posts chronologically";
    }

    return (
        <React.Fragment>
            {state.mode === "reload" && <SkeletalContent count={3} lines={6}/>}

            {state.mode === "loaded" && state.data &&
                <Box>
                    <OnScreen onVisibilityChanged={visible => setScrolledDown(!visible)}
                              sx={{position: "relative", top: -20}}/>

                    <FeedNavigator pageNumber={state.data.pageNumber}
                                   totalPages={state.data.totalPages}
                                   status={status}
                                   onPageChange={handleSetPage}/>

                    {state.data.posts && state.data.posts.length > 0 && <Stack mt={2} mb={1} spacing={2}>
                        {state.data.posts.map((post, index) =>
                            <Box key={`post-${index + 1}`}>
                                <SharingStatus user={post.author} info={`on ${formatDateTime(post.created)}`}/>
                                <Link component={LinkBehavior} variant="h5" href={`post/${post.id}`} underline="none"
                                      color="inherit">{post.title}</Link>
                                <TagArray tags={post.tags}/>
                                <MarkdownPreview content={post.text}/>
                                <Box>
                                    <Button color="inherit" variant="text" href={`post/${post.id}/#discussion`}
                                            startIcon={<CommentsIcon/>}>Discussion</Button>
                                </Box>
                            </Box>
                        )}
                    </Stack>}

                    <Slide in={scrolledDown} direction="up" mountOnEnter unmountOnExit>
                        <FeedNavigator mode="sticky"
                                       pageNumber={state.data.pageNumber}
                                       totalPages={state.data.totalPages}
                                       status={status}
                                       onPageChange={handleSetPage}/>
                    </Slide>
                </Box>}

            {(state.mode === "loaded-nodata" || state.mode === "loaded-error") &&
                <Box sx={{height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {state.mode === "loaded-error" && <WarningIcon color="warning" fontSize="large"/>}
                    <Typography variant="h6">
                        {state.mode === "loaded-error" ? "Could not load posts" : "No posts yet"}
                    </Typography>
                </Box>}
        </React.Fragment>
    );
}

export default Feed;
