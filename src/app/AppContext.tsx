import { noop } from "lodash";
import React, { FunctionComponent, useState } from "react";

export interface AppContext {
    appData: AppState;
    setAppData: (appSate: AppState) => void;
}

const defaultAppState = {
    sessionId: "",
    tileSize: 70
}

const appContext = React.createContext<AppContext>({
    appData: defaultAppState,
    setAppData: noop
});

export interface AppState {
    sessionId: string;
    tileSize: number;
}
const AppProvider: FunctionComponent = ({ children }) => {
    const [appSate, setAppState] = useState<AppState>(defaultAppState);
    return (
        <appContext.Provider value={{ appData: appSate, setAppData: setAppState }}>
            {children}
        </appContext.Provider>
    );
};

export {
    AppProvider,
    appContext
}