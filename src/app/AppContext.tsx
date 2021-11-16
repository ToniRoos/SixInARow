import React, { FunctionComponent, useContext, useState } from "react";

export interface AppContext {
    appData?: AppState;
    setAppData?: (appSate: AppState) => void;
}
const appContext = React.createContext<AppContext>({});

export interface AppState {
    sessionId: string;
}
const AppProvider: FunctionComponent = ({ children }) => {
    const [appSate, setAppState] = useState<AppState>();
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