import { UserSessionData } from "../backend";
import { BoardData, TileData, TileSymbols } from "../types";
import { checkBoardSize, checkMoveForAlreadyPlayedTilesOfTurn, findMatchingTilesByCheckingNeighbours } from "./boardLogic";

export const game = (function () {

    const stock: TileSymbols[] = [];
    const userStore: UserSessionData[] = [];
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

    const createInitalStock = () => {

        const amountOfColors = 6;
        const amountOfShapes = 6;
        const amountOfSetsPerColor = 3;

        for (let m = 0; m < amountOfSetsPerColor; m++) {
            for (let color = 1; color < amountOfColors + 1; color++) {
                for (let shape = 1; shape < amountOfShapes + 1; shape++) {
                    stock.push({ color: color, symbol: shape })
                }
            }
        }
    }

    // (() => {
    //     stock = createInitalStock();
    // })();

    return { // public interface
        getNextTiles: function (number: number) {

            const tiles = [];
            for (let i = 0; i < number; i++) {

                let max = stock.length - 1;
                let min = 0;
                let tileIndex = Math.floor(Math.random() * (max - min)) + min;
                let tile = stock.splice(tileIndex, 1)[0];
                tiles.push(tile);
            }

            // tiles.forEach((element, index) => {
            //     element.id = index;
            // });
            return tiles;
        },
        createGame: function () {

            createInitalStock();
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

            const tileMatches = findMatchingTilesByCheckingNeighbours(tileOnBoard, tileToMove.color, tileToMove.symbol, game.getTilesOfGame());
            if (!tileMatches) {
                return false;
            }

            let sessionData = game.getSession(id);
            let tilesOnTurn = sessionData.tilesOnTurn;

            console.log("Tiles on turn: " + JSON.stringify(tilesOnTurn))

            return checkMoveForAlreadyPlayedTilesOfTurn(tilesOnTurn, tileOnBoard);
        },
        getGameData: () => {
            return gameData;
        },
        setActivePlayer: (activePlayer: string) => {
            gameData.activePlayer = activePlayer;
        },
        getUserSessions: () => {
            return userStore;
        },
        getSession: (id?: string) => {
            console.log('get session: ', id);
            const session = userStore.filter(item => item.id === id)[0];
            return session;
        },
        addUserSession: (sessionData: UserSessionData) => {
            userStore.push(sessionData);
        },
        getUserNames: () => {
            return userStore.map(items => items.name);
        },
        countUsers: () => {
            return userStore.length;
        },
        removeSession: (id: string) => {
            console.log('close session: ', id);
            const index = userStore.findIndex(item => item.id === id);
            if (index >= 0) {
                userStore.splice(index, 1);
                console.log('removed id: %s', id);
            }
        }
    };
})();