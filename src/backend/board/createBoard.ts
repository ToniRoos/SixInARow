import { BoardData, TileData } from "../../types";

const createBoard = (): BoardData => {

    const initalSize = 3;
    const retVal: TileData[] = [];
    for (let i = 0; i < initalSize; i++) {
        for (let j = 0; j < initalSize; j++) {
            retVal.push({
                position: {
                    x: j,
                    y: i
                }
            })
        }
    }

    const gameData = {
        tiles: retVal,
        sizeX: initalSize,
        sizeY: initalSize,
        activePlayer: ""
    };

    return gameData;
};

export { createBoard };