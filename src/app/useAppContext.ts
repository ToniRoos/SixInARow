import { useContext } from "react";
import { appContext } from "./AppContext";

interface UseAppContextType {
    sessionId: string;
    setSessionId: (sessionId: string) => void;
    tileSize: number;
    setTileSize: (tileSize: number) => void;
}

const useAppContext = (): UseAppContextType => {
    const { appData, setAppData } = useContext(appContext);

    const setSessionId = (sessionId: string) => {
        setAppData({
            ...appData,
            sessionId
        })
    };

    const setTileSize = (tileSize: number) => {
        setAppData({
            ...appData,
            tileSize
        })
    };

    return {
        sessionId: appData.sessionId,
        setSessionId,
        tileSize: appData.tileSize,
        setTileSize
    }
};

export { useAppContext };
