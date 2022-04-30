import React from "react";

export interface IApplicationContext {
    section?: string;
    configureView: (section: string) => void;
    ejectView: () => void;
}

export const ApplicationContext = React.createContext<IApplicationContext>({
    configureView: () => {},
    ejectView: () => {}
});
