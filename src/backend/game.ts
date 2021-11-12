
import { BoardData, TileData, TileSymbols } from "../types";
import { checkBoardSize, checkMoveForAlreadyPlayedTilesOfTurn, findMatchingTilesByCheckingNeighbours } from "../logic/boardLogic";
import { createInitalStock } from "./tileStock/createInitialTileStock";
import { StockType } from "./tileStock/tileStock";
import { createUserStore } from "./userStore/createUserStore";
import { UserStore } from "./userStore/userStore";
import { UserSessionData } from "./userStore/UserSessionData";

export const game = (function () {

    let stock: StockType;
    const userStore: UserStore = createUserStore();
    let gameData: BoardData;

    const intialStateForBoard = () => {

        const initalSize = 3;
        const retVal: TileData[] = [];
        for (let i = 0; i < initalSize; i++) {
            for (let j = 0; j < initalSize; j++) {
                retVal.push({
                    x: j,
                    y: i
                })
            }
        }

        gameData = {
            tiles: retVal,
            sizeX: initalSize,
            sizeY: initalSize,
            activePlayer: ""
        };

        return gameData;
    };

    return { // public interface
        getNextTiles: function (number: number) {

            return stock.getNextTiles(number);
        },
        createGame: function () {

            stock = createInitalStock();
            return intialStateForBoard();
        },
        getTileForCoordinates: (tile: TileData) => {
            const tileToChange = gameData.tiles.filter(item => item.x === tile.x && item.y === tile.y)[0];
            return tileToChange;
        },
        getTilesOfGame: () => {

            return gameData.tiles;
        },
        executeMove: (tileToMove: TileData) => {

            const tileOnBoard = game.getTileForCoordinates(tileToMove);
            tileOnBoard.color = tileToMove.color;
            tileOnBoard.symbol = tileToMove.symbol;

            let sizeY = gameData.sizeY;
            let sizeX = gameData.sizeX;

            sizeY = checkBoardSize('y', tileOnBoard, gameData, sizeX, sizeY);
            sizeX = checkBoardSize('x', tileOnBoard, gameData, sizeX, sizeY);

            gameData = { ...gameData, sizeY: sizeY, sizeX: sizeX };
            return gameData;
        },
        checkMove: (id: string, tileToMove: TileData) => {

            const tileOnBoard = game.getTileForCoordinates(tileToMove);
            const tilesAtBoard = game.getTilesOfGame();

            const tileMatches = findMatchingTilesByCheckingNeighbours(tileOnBoard, tileToMove.color, tileToMove.symbol, tilesAtBoard);
            if (!tileMatches) {
                return false;
            }

            let sessionData = game.getSession(id);
            let tilesOnTurn = sessionData.tilesOnTurn;

            console.log("Tiles on turn: " + JSON.stringify(tilesOnTurn))

            const allowMove = checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurn, tileOnBoard);

            if (allowMove && tilesOnTurn.length === 0) {
                // const allowMoveForRow = tilesAtBoard.filter(tile => tile.x = tileToMove.x && Math.abs(tile.y - tileToMove.y) === 1)
            }

            return allowMove;
        },
        getGameData: () => {
            return gameData;
        },
        setActivePlayer: (activePlayer: string) => {
            gameData.activePlayer = activePlayer;
        },
        getUserSessions: () => {
            return userStore.getUserSessions();
        },
        getSession: (id?: string) => {
            return userStore.getSession(id);
        },
        addUserSession: (sessionData: UserSessionData) => {
            return userStore.createUserSession(sessionData.name);
        },
        getUserNames: () => {
            return userStore.getUserNames();
        },
        countUsers: () => {
            return userStore.countUsers();
        },
        removeSession: (id: string) => {
            return userStore.removeSession(id);
        }
    };
})();