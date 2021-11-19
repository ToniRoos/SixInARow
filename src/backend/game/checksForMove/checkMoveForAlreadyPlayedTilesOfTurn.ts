import { TileData, TilePosition } from "../../../types";
import { ForwardBackward as SearchDirection } from "../../board/findNeighboursForDirection";
import { stockConfig } from "../../tileStock/stockConfig";

const checkMoveForAlreadyPlayedTilesOfTurn = (allTilesOnBoard: TileData[], playedTilesOnTurn: TilePosition[], actualPlayPosition: TilePosition): boolean => {

    const playedTilesAmount = playedTilesOnTurn.length;
    let retVal = false;

    if (playedTilesAmount === 0) {
        return true;
    }

    if (allTilesOnBoard.filter(tile => tile.symbol).length === playedTilesOnTurn.length) {
        return playedTilesOnTurn.every(tile => tile.x === actualPlayPosition.x)
            || playedTilesOnTurn.every(tile => tile.y === actualPlayPosition.y);
    }

    const firstPlayedTileOnTurn: TilePosition = playedTilesOnTurn[0];
    const isInSameColumn = firstPlayedTileOnTurn.x === actualPlayPosition.x;
    const isInSameRow = firstPlayedTileOnTurn.y === actualPlayPosition.y;

    if (isInSameRow) {

        const { moveAllallowed: foundInRowForward, isAnyTileOnBoardInSeries: isAnyTileOnBoardInSeriesForward } = checkAllTilesBetweenFirstPlayedTileOnTurnAndActualPlayedTile(allTilesOnBoard, playedTilesOnTurn, actualPlayPosition, SearchMode.row, SearchDirection.forward);
        // if (foundInRowForward) {
        //     return true;
        // }

        const { moveAllallowed: foundInRowBackward, isAnyTileOnBoardInSeries: isAnyTileOnBoardInSeriesBackward } = checkAllTilesBetweenFirstPlayedTileOnTurnAndActualPlayedTile(allTilesOnBoard, playedTilesOnTurn, actualPlayPosition, SearchMode.row, SearchDirection.backward);
        if (foundInRowForward || foundInRowBackward) {
            return isAnyTileOnBoardInSeriesForward
                || isAnyTileOnBoardInSeriesBackward;
        }
    }

    if (isInSameColumn) {

        const { moveAllallowed: foundInColumnForward, isAnyTileOnBoardInSeries: isAnyTileOnBoardInSeriesForward } = checkAllTilesBetweenFirstPlayedTileOnTurnAndActualPlayedTile(allTilesOnBoard, playedTilesOnTurn, actualPlayPosition, SearchMode.column, SearchDirection.forward);
        // if (foundInColumnForward) {
        //     return true;
        // }

        const { moveAllallowed: foundInColumnBackward, isAnyTileOnBoardInSeries: isAnyTileOnBoardInSeriesBackward } = checkAllTilesBetweenFirstPlayedTileOnTurnAndActualPlayedTile(allTilesOnBoard, playedTilesOnTurn, actualPlayPosition, SearchMode.column, SearchDirection.backward);
        if (foundInColumnForward || foundInColumnBackward) {
            return isAnyTileOnBoardInSeriesForward
                || isAnyTileOnBoardInSeriesBackward;
        }
    }
    return retVal;
}

export const enum SearchMode {
    row = 'x',
    column = 'y'
}

const checkAllTilesBetweenFirstPlayedTileOnTurnAndActualPlayedTile = (allTilesOnBoard: TileData[], playedTilesOnTurn: TilePosition[], actualPlayPosition: TilePosition, searchMode: SearchMode, searchDirection: SearchDirection) => {

    const firstPlayedTileOnTurn: TilePosition = playedTilesOnTurn[0];
    const searchDirectionFactor = searchDirection === SearchDirection.forward ? 1 : -1;
    const startPosition = searchMode === SearchMode.row ? firstPlayedTileOnTurn.x : firstPlayedTileOnTurn.y;
    let moveAllallowed = false;
    let isAnyTileOnBoardInSeries = false;

    for (let index = 1; index < stockConfig.amountOfTiles; index++) {

        const offset = startPosition + (searchDirectionFactor * index);
        const checkX = searchMode === SearchMode.row ? offset : firstPlayedTileOnTurn.x;
        const checkY = searchMode === SearchMode.column ? offset : firstPlayedTileOnTurn.y;
        console.debug(`Looking for board field at [x:${checkX}, y:${checkY}]`)

        const nextBoardFieldIsEmpty = isBoardFieldEmpty(allTilesOnBoard, checkX, checkY);
        const noPlayedTileForPosition = noPlayedTilesOnTurnForPosition(playedTilesOnTurn, checkX, checkY);

        if (searchMode === SearchMode.row && checkX === actualPlayPosition.x) {

            // if (allTilesOnBoard.filter(tile => tile.symbol).length === playedTilesOnTurn.length) {
            //     moveAllallowed = playedTilesOnTurn.every(tile => tile.y === actualPlayPosition.y);
            //     break;
            // }
            moveAllallowed = true;
        }

        if (searchMode === SearchMode.column && checkY === actualPlayPosition.y) {

            // if (allTilesOnBoard.filter(tile => tile.symbol).length === playedTilesOnTurn.length) {
            //     moveAllallowed = playedTilesOnTurn.every(tile => tile.x === actualPlayPosition.x);
            //     break;
            // }
            moveAllallowed = true;
        }

        if (!nextBoardFieldIsEmpty) {
            isAnyTileOnBoardInSeries = true;
        }

        if (nextBoardFieldIsEmpty && noPlayedTileForPosition) {

            console.debug(`Can't drop tile to board, cause of gap [x:${checkX}, y:${checkY}]`)
            break;
        }
    }
    return { moveAllallowed, isAnyTileOnBoardInSeries };
}

const isBoardFieldEmpty = (allTilesOnBoard: TileData[], x: number, y: number): boolean => {
    const nextBoardField = allTilesOnBoard.find(
        tile => tile.position.y === y
            && tile.position.x === x
    );
    const nextBoardFieldIsEmpty = !nextBoardField || !nextBoardField.symbol;
    return nextBoardFieldIsEmpty;
}

const noPlayedTilesOnTurnForPosition = (playedTilesOnTurn: TilePosition[], x: number, y: number): boolean => {

    const playedTileForPosition = playedTilesOnTurn.find(
        tile => tile.x === x
            && tile.y === y
    );
    const noPlayedTileForPosition = !playedTileForPosition;
    return noPlayedTileForPosition;
}

export { checkMoveForAlreadyPlayedTilesOfTurn };