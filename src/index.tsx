import React from 'react';
import ReactDOM from 'react-dom/client';
import {CookiesProvider} from "react-cookie";
import reportWebVitals from './reportWebVitals';

import {installMockServer} from "@api/mock";
import Router from "@containers/Router";

// internationalization support
import "@utils/i18n";

// Roboto font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Install local server for mocking API requests if necessary
if (process.env.REACT_APP_API_MOCKING === "true" /* && process.env.NODE_ENV !== "production" */) {
    installMockServer();
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <React.Suspense fallback="Application is loading...">
            <CookiesProvider>
                <Router/>
            </CookiesProvider>
        </React.Suspense>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
