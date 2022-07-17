import React from "react";

export type SearchHandler = (search: string) => void;

export interface IApplicationContext {
    preferences: any,
    configureView: (section: string, searcher?: SearchHandler) => void;
    configureSidebar: (component: JSX.Element, slot?: number, caption?: string) => void;
    ejectView: () => void;
    updatePreferences: (init: any, prefs: any) => void;
}

export const ApplicationContext = React.createContext<IApplicationContext>({
    preferences: {},
    configureSidebar: () => {},
    configureView: () => {},
    ejectView: () => {},
    updatePreferences: () => {},
});
