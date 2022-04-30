import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App";
import Blog from "./Blog";

const Router = () => {
    return (
        <BrowserRouter basename={process.env.REACT_APP_UI_ROOT || "/"}>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="/blog" element={<Blog/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;