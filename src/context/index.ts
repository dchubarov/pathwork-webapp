import React from "react";

export interface IApplicationContext {
    togglePaletteMode: () => void;
    configureView: (section: string) => void;
    ejectView: () => void;
}

export const ApplicationContext = React.createContext<IApplicationContext>({
    togglePaletteMode: () => {},
    configureView: () => {},
    ejectView: () => {}
});
