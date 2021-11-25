import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { TileData } from "../../../types";
import { checkMove } from "../../api/api";

const useCheckMove = (id: string) => {

    const [tileToMove, setTileToMove] = useState<TileData | undefined>(undefined);
    useQuery(['checkMove', tileToMove], () => checkMove(id, tileToMove!), {
        enabled: tileToMove !== undefined
    });

    useEffect(() => {

        if (tileToMove !== undefined) {
            setTileToMove(undefined);
        }
    }, [tileToMove]);

    return {
        checkTileForMove: setTileToMove
    };
};

export { useCheckMove };