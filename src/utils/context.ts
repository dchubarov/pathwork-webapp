import React from "react";

export type SearchHandler = (search: string) => void;

export interface Auth {
    isLoggedIn: boolean;
    session?: string;
    user?: string;
}

export const LoggedOut: Auth = {isLoggedIn: false};

export interface IApplicationContext {
    auth: Auth;
    preferences: any;
    login: (user: string, password: string) => void;
    logout: () => void;
    configureView: (section: string, searcher?: SearchHandler) => void;
    configureSidebar: (component: JSX.Element, slot?: number, caption?: string) => void;
    ejectView: () => void;
    updatePreferences: (init: any, prefs: any) => void;
}

export const ApplicationContext = React.createContext<IApplicationContext>({
    auth: LoggedOut,
    preferences: {},
    login: () => {},
    logout: () => {},
    configureSidebar: () => {},
    configureView: () => {},
    ejectView: () => {},
    updatePreferences: () => {},
});
