import { useQuery } from "react-query";
import { getGameStatus } from "../../api/api";

const useGameState = (id: string) => {

    const { status, data } = useQuery('gameState', () => getGameStatus(id), {
        refetchInterval: 500
    });

    return {
        ...data
    };
};

export { useGameState };