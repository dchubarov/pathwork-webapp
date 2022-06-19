import React from "react";

export type SearchHandler = (search: string) => void;

export interface IApplicationContext {
    togglePaletteMode: () => void;
    configureView: (section: string, searcher?: SearchHandler) => void;
    configureSidebar: (component: JSX.Element, slot?: number, caption?: string) => void;
    ejectView: () => void;
}

export const ApplicationContext = React.createContext<IApplicationContext>({
    togglePaletteMode: () => {},
    configureSidebar: () => {},
    configureView: () => {},
    ejectView: () => {}
});
