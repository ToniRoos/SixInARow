import { useContext } from "react";
import { appContext } from "./AppContext";

interface UseAppContextType {
    sessionId?: string;
    setSessionId: (sessionId: string) => void;
}

const useAppContext = (): UseAppContextType => {
    const { appData, setAppData } = useContext(appContext);
    return {
        sessionId: appData?.sessionId,
        setSessionId: (sessionId: string) => {
            if (setAppData) {
                setAppData({ ...appData, sessionId });
            }
        }
    }
};

export { useAppContext };
