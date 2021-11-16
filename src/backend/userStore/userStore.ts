import { TileData } from "../../types";
import { createUUID } from "../utils/createUUID";
import { tileSymbolToString } from "../utils/tileToString";
import { UserSessionData } from "./UserSessionData";

export interface UserStore {
    createUserSession: (name: string) => string;
    removeSession: (id: string) => void;
    getUserSessions: () => UserSessionData[];
    getSession: (id?: string) => UserSessionData | undefined;
    getUserNames: () => string[];
    countUsers: () => number;
    moveTileToActiveTurnTiles: (id: string, playedTile: TileData) => void;
    getNextPlayer: (id: string) => UserSessionData;
}

const userStore = (): UserStore => {

    const userStore: UserSessionData[] = [];

    const getUserSessions = (): UserSessionData[] => {
        return userStore;
    };

    const getSession = (id?: string): UserSessionData | undefined => {
        const session = userStore.find(item => item.id === id);
        return session;
    };

    const createUserSession = (name: string): string => {

        const id = createUUID();
        const userSessionData = {
            id: id,
            name: name,
            tilesOnHand: [],
            tilesOnTurn: []
        }
        userStore.push(userSessionData);
        return id;
    };

    const getUserNames = (): string[] => {
        return userStore.map(items => items.name);
    };

    const countUsers = (): number => {
        return userStore.length;
    };

    const removeSession = (id: string): void => {
        console.log('close session: ', id);
        const index = userStore.findIndex(item => item.id === id);
        if (index >= 0) {
            userStore.splice(index, 1);
            console.log('removed id: %s', id);
        }
    }

    const moveTileToActiveTurnTiles = (id: string, playedTile: TileData) => {

        const player = getSession(id)!;
        const tileMatchedOnHand = player.tilesOnHand.find(tile =>
            tile.color === playedTile.symbol!.color
            && tile.symbol === playedTile.symbol!.symbol
        );

        const indexToRemove = player.tilesOnHand.indexOf(tileMatchedOnHand!);
        const removed = player.tilesOnHand.splice(indexToRemove, 1)[0];
        console.log(`Tile to remove: ${tileSymbolToString(removed)}`);
        player.tilesOnTurn.push({ ...playedTile });
    }

    const getNextPlayer = (id: string): UserSessionData => {

        let nextPlayer: UserSessionData;
        const sessionIndex = userStore.findIndex(player => player.id === id);
        if (sessionIndex < countUsers() - 1) {
            nextPlayer = userStore[sessionIndex + 1];
        } else {
            nextPlayer = userStore[0];
        }

        return nextPlayer;
    }

    return {
        getUserSessions,
        createUserSession,
        countUsers,
        getSession,
        getUserNames,
        removeSession,
        moveTileToActiveTurnTiles,
        getNextPlayer
    };
};

export { userStore };
