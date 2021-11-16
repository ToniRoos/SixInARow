
import { BoardData, TileData, TileSymbols } from "../types";
import { Board } from "./board/board";
import { checkMove } from "./game/checkMove";
import { getGameStatus } from "./game/getGameStatus";
import { nextTurn } from "./game/nextTurn";
import { startGame } from "./game/startGame";
import { TileStock } from "./tileStock/tileStock";
import { createUserStore } from "./userStore/createUserStore";
import { UserStore } from "./userStore/userStore";
import { tileToString } from "./utils/tileToString";

export const enum GameRunningState {
    init = "INIT",
    started = "STARTED"
}

export interface GameStatus {
    players: string[];
    state: GameRunningState;
    activeTurn: boolean;
    board?: BoardData;
    tilesOnHand: TileSymbols[];
    activePlayer: string;
}

export interface GameState {
    userStore: UserStore;
    state: GameRunningState;
    board?: Board;
    stock?: TileStock;
    activePlayerId: string;
    activePlayerName: string;
}

export interface Game {
    addPlayer: (name: string) => string;
    getGameStatus: (id?: string) => GameStatus;
    startGame: (id: string) => void;
    checkMove: (id: string, tileToMove: TileData) => boolean;
    nextTurn: (id: string) => void;
}

const game = (): Game => {

    const gameState: GameState = {
        userStore: createUserStore(),
        state: GameRunningState.init,
        activePlayerId: "",
        activePlayerName: ""
    }

    const addPlayer = (name: string) => {
        const id = gameState.userStore.createUserSession(name);
        return id;
    }

    const checkMoveInternal = (id: string, tileToPlay: TileData): boolean => {

        const tileOnBoard = gameState.board!.getTileForCoordinates(tileToPlay);
        const moveAllowed = checkMove(gameState, id, tileToPlay);

        console.log(`Tile on board: ${tileToString(tileOnBoard)}`);
        if (moveAllowed) {
            gameState.userStore.moveTileToActiveTurnTiles(id, tileToPlay);
            gameState.board!.placeTileAtBoard(tileToPlay);
            gameState.board!.resizeBoard(tileOnBoard);
        }
        return moveAllowed;
    }

    return {
        addPlayer,
        getGameStatus: (id?) => getGameStatus(gameState, id),
        startGame: (id?) => startGame(gameState, id),
        checkMove: checkMoveInternal,
        nextTurn: (id) => nextTurn(gameState, id)
    };
};

export { game };