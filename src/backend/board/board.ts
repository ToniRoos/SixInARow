
import { checkBoardSize } from "./checkBoardSize";
import { BoardData, TileData } from "../../types";
import { createBoard } from "./createBoard";

export interface Board {
    getTileForCoordinates: (tile: TileData) => TileData;
    getBoardData: () => BoardData;
    resizeBoard: (tileOnBoard: TileData) => void;
    placeTileAtBoard: (tileToPlace: TileData) => void;
}

const board = (): Board => {

    const boardData: BoardData = createBoard();

    const getTileForCoordinates = ({ position }: TileData) => {
        const tileToChange = boardData.tiles.filter(item => item.position.x === position.x && item.position.y === position.y)[0];
        return tileToChange;
    }

    const resizeBoard = (tileOnBoard: TileData) => {
        let sizeY = boardData.sizeY;
        let sizeX = boardData.sizeX;

        sizeY = checkBoardSize('y', tileOnBoard, boardData, sizeX, sizeY);
        sizeX = checkBoardSize('x', tileOnBoard, boardData, sizeX, sizeY);

        boardData.sizeX = sizeX;
        boardData.sizeY = sizeY;
    }

    const placeTileAtBoard = ({ position, symbol }: TileData) => {
        const tileToChange = boardData.tiles.filter(tile => tile.position.x === position.x && tile.position.y === position.y)[0];
        tileToChange.symbol = symbol;
    }

    return {
        getTileForCoordinates,
        getBoardData: () => boardData,
        resizeBoard,
        placeTileAtBoard
    };
};

export { board };