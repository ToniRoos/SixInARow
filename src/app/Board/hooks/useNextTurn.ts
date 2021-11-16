import { useQuery } from "react-query";
import { nextTurn } from "../../api/api";

const useNextTurn = (id: string) => {

    const { refetch } = useQuery('nextTurn', () => nextTurn(id), {
        enabled: false
    });

    return {
        nextTurn: refetch
    };
};

export { useNextTurn };