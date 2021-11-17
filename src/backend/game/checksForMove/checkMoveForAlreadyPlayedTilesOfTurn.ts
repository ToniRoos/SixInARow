import { TilePosition } from "../../../types";
import { stockConfig } from "../../tileStock/stockConfig";

const checkMoveForAlreadyPlayedTilesOfTurn = (playedTilesPosition: TilePosition[], tileOnBoardPosition: TilePosition) => {

    const playedTilesAmount = playedTilesPosition.length;
    let retVal = false;

    if (playedTilesAmount === 0) {
        retVal = true;
    }

    if (playedTilesAmount === 1) {

        retVal = tileOnBoardPosition.x === playedTilesPosition[0].x && Math.abs(tileOnBoardPosition.y - playedTilesPosition[0].y) === 1
            || tileOnBoardPosition.y === playedTilesPosition[0].y && Math.abs(tileOnBoardPosition.x - playedTilesPosition[0].x) === 1;
    }

    if (playedTilesAmount > 1 && playedTilesAmount < stockConfig.amountOfTiles) {

        const numberInRow = playedTilesPosition.filter(item => item.x === tileOnBoardPosition.x).length;
        const numberInCol = playedTilesPosition.filter(item => item.y === tileOnBoardPosition.y).length;

        if (numberInRow === playedTilesAmount) {
            const hasAnyDirectNeighbour = playedTilesPosition.filter(item => Math.abs(item.y - tileOnBoardPosition.y) === 1).length > 0;
            retVal = hasAnyDirectNeighbour;
        }
        if (numberInCol === playedTilesAmount) {
            const hasAnyDirectNeighbour = playedTilesPosition.filter(item => Math.abs(item.x - tileOnBoardPosition.x) === 1).length > 0;
            retVal = hasAnyDirectNeighbour;
        }
    }

    return retVal;
}

export { checkMoveForAlreadyPlayedTilesOfTurn };