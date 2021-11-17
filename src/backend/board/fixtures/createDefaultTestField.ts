import { TileData } from "../../../types";

const createDefaultTestField = (fieldSize: number, tilesOnBoard: TileData[]): TileData[] => {

    const retVal: TileData[] = [];
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {

            const tileFound = tilesOnBoard.find(tileOnBoard => tileOnBoard.position.x === j && tileOnBoard.position.y === i);

            if (tileFound) {
                retVal.push({ ...tileFound });
            } else {
                retVal.push({
                    position: {
                        x: j,
                        y: i
                    }
                });
            }

        }
    }
    // printBoardToConsole(retVal);
    return retVal;
}

export { createDefaultTestField };