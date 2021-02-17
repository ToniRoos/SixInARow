import { BoardData, TileData, TileSymbols } from "../types";
import { checkBoardSize } from "./boardLogic";

export const stock = (function () {
    var stock: TileSymbols[] = [];
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
            sizeY: initalSize
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
        executeMove: (tileOnBoard: TileData, tileToMove: TileData) => {

            tileOnBoard.color = tileToMove.color;
            tileOnBoard.symbol = tileToMove.symbol;

            let sizeY = gameData.sizeY;
            let sizeX = gameData.sizeX;

            sizeY = checkBoardSize('y', tileOnBoard, gameData, sizeX, sizeY);
            sizeX = checkBoardSize('x', tileOnBoard, gameData, sizeX, sizeY);

            gameData = { ...gameData, sizeY: sizeY, sizeX: sizeX };
            return gameData;
            //TODO refresh board
        }
    };
})();