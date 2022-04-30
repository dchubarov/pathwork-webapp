import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {installMockServer} from "./api/mock";

// Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {CssBaseline} from "@mui/material";
import Router from "./components/Router";

// Install local server for mocking API requests if necessary
if (process.env.REACT_APP_API_MOCKING === "true" && process.env.NODE_ENV !== "production") {
    installMockServer();
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <CssBaseline/>
        <Router/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
