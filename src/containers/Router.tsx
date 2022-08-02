import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {App} from "./App";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import * as Blog from "./Blog";
import * as Records from "./Records";
import * as Panorama from "./Panorama";

const Router = () => {
    return (
        <BrowserRouter basename={process.env.REACT_APP_UI_ROOT || "/"}>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<Dashboard/>}/>

                    <Route path="blog">
                        <Route index element={<Blog.Feed/>}/>
                        <Route path="post/:slug" element={<Blog.Post/>}/>
                    </Route>

                    <Route path="records">
                        <Route index element={<Records.Browser/>}/>
                    </Route>

                    <Route path="panorama">
                        <Route index element={<Panorama.Calendar/>}/>
                        <Route path=":year" element={<Panorama.Calendar/>}/>
                    </Route>

                    <Route path="account">
                        <Route path="my" element={<Profile/>}/>
                        <Route path="users/:login" element={<Profile/>}/>
                    </Route>

                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
