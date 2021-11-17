import { BoardData, TileData } from "../../types";

const checkBoardSize = (directionToCheck: 'x' | 'y', tileToChange: TileData, board: BoardData, sizeX: number, sizeY: number) => {

    let sizeForDirection = directionToCheck === 'x' ? sizeX : sizeY;
    const oppositeSize = directionToCheck === 'x' ? sizeY : sizeX;

    if (tileToChange.position[directionToCheck] === 0) {
        board.tiles.forEach(item => {
            item.position[directionToCheck] = item.position[directionToCheck] + 1;
        });
        for (let i = 0; i < oppositeSize; i++) {

            const emptyTileForDirection: TileData = directionToCheck === 'x'
                ? {
                    position: {
                        x: 0,
                        y: i
                    }
                }
                : {
                    position: {
                        x: i,
                        y: 0
                    }
                };

            board.tiles.push(emptyTileForDirection);
        }
        sizeForDirection = sizeForDirection + 1;
    }
    if (tileToChange.position[directionToCheck] === sizeForDirection - 1) {

        for (let i = 0; i < oppositeSize; i++) {

            const emptyTileForDirection: TileData = directionToCheck === 'x'
                ? {
                    position: {
                        x: sizeForDirection,
                        y: i
                    }
                }
                : {
                    position: {
                        x: i,
                        y: sizeForDirection
                    }
                };

            board.tiles.push(emptyTileForDirection);
        }
        sizeForDirection = sizeForDirection + 1;
    }
    return sizeForDirection;
}

export { checkBoardSize };