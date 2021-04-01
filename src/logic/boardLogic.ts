import { BoardData, TileData, TileSymbols } from "../types";

type tileDescriptor = 'color' | 'symbol';
type coordinatesTypes = 'x' | 'y';

export function checkBoardSize(directionToCheck: 'x' | 'y', tileToChange: TileData, board: BoardData, sizeX: number, sizeY: number) {

    let sizeForDirection = directionToCheck === 'x' ? sizeX : sizeY;
    const oppositeSize = directionToCheck === 'x' ? sizeY : sizeX;

    if (tileToChange[directionToCheck] === 0) {
        board.tiles.forEach(item => {
            item[directionToCheck] = item[directionToCheck] + 1;
        });
        for (let i = 0; i < oppositeSize; i++) {

            const emptyTileForDirection = directionToCheck === 'x'
                ? {
                    x: 0,
                    y: i
                }
                : {
                    x: i,
                    y: 0
                };

            board.tiles.push(emptyTileForDirection);
        }
        sizeForDirection = sizeForDirection + 1;
    }
    if (tileToChange[directionToCheck] === sizeForDirection - 1) {

        for (let i = 0; i < oppositeSize; i++) {

            const emptyTileForDirection = directionToCheck === 'x'
                ? {
                    x: sizeForDirection,
                    y: i
                }
                : {
                    x: i,
                    y: sizeForDirection
                };

            board.tiles.push(emptyTileForDirection);
        }
        sizeForDirection = sizeForDirection + 1;
    }
    return sizeForDirection;
}

export const checkMoveForAlreadyPlayedTilesOfTurn = (tilesOnTurn: TileData[], tileOnBoard: TileData) => {

    const tilesOnTurnSize = tilesOnTurn.length;
    let retVal = false;

    if (tilesOnTurnSize === 0) {
        retVal = true;
    }

    if (tilesOnTurnSize === 1) {

        retVal = tileOnBoard.x === tilesOnTurn[0].x && Math.abs(tileOnBoard.y - tilesOnTurn[0].y) === 1
            || tileOnBoard.y === tilesOnTurn[0].y && Math.abs(tileOnBoard.x - tilesOnTurn[0].x) === 1;
    }

    if (tilesOnTurnSize > 1 && tilesOnTurnSize < 6) {

        const numberInRow = tilesOnTurn.filter(item => item.x === tileOnBoard.x).length;
        const numberInCol = tilesOnTurn.filter(item => item.y === tileOnBoard.y).length;

        if (numberInRow === tilesOnTurnSize) {
            const hasAnyDirectNeighbour = tilesOnTurn.filter(item => Math.abs(item.y - tileOnBoard.y) === 1).length > 0;
            retVal = hasAnyDirectNeighbour;
        }
        if (numberInCol === tilesOnTurnSize) {
            const hasAnyDirectNeighbour = tilesOnTurn.filter(item => Math.abs(item.x - tileOnBoard.x) === 1).length > 0;
            retVal = hasAnyDirectNeighbour;
        }
    }

    if (retVal) {
        tilesOnTurn.push(tileOnBoard);
    }

    return retVal;
}

export const findMatchingTilesByCheckingNeighbours = (tileToSearch: TileData, color: number | undefined, symbol: number | undefined, tilesAtBoard: TileData[]) => {

    const tilesCol: TileData[] = [
        ...findNeighboursForDirection('y', tileToSearch, tilesAtBoard, 1),
        ...findNeighboursForDirection('y', tileToSearch, tilesAtBoard, -1)
    ];

    if (tilesCol.length > 5) {
        return false;
    }

    var matchesForColorForCol = listPossiblesMatches(tilesCol, 'color');
    var matchesForSymbolForCol = listPossiblesMatches(tilesCol, 'symbol');
    var matchesForCol = [...matchesForColorForCol, ...matchesForSymbolForCol];

    if (tilesCol.length > 0 && matchesForCol.length === 0) {
        return false;
    }

    const tilesRow: TileData[] = [
        ...findNeighboursForDirection('x', tileToSearch, tilesAtBoard, 1),
        ...findNeighboursForDirection('x', tileToSearch, tilesAtBoard, -1)
    ];
    if (tilesRow.length > 5) {
        return false;
    }

    var matchesForColorForRow = listPossiblesMatches(tilesRow, 'color');
    var matchesForSymbolForRow = listPossiblesMatches(tilesRow, 'symbol');
    var matchesForRow = [...matchesForColorForRow, ...matchesForSymbolForRow];

    if (tilesRow.length > 0 && matchesForRow.length === 0) {
        return false;
    }

    if (matchesForCol.length === 0 && matchesForRow.length === 0 && tilesAtBoard.length > 9) {
        return false;
    }

    return tileFitsInSeries(matchesForCol, color, symbol) && tileFitsInSeries(matchesForRow, color, symbol);
}

const listPossiblesMatches = (tileSeries: TileData[], typeToCheck: tileDescriptor) => {

    if (tileSeries.length === 0) {
        return [];
    }

    const oppositeType: tileDescriptor = typeToCheck === 'color' ? 'symbol' : 'color';
    const firstTile = tileSeries[0];
    const allOfSameTypeToCheck = tileSeries.filter(tile => tile[typeToCheck] === firstTile[typeToCheck]).length === tileSeries.length;
    if (allOfSameTypeToCheck) {
        const matchingTiles: TileSymbols[] = [];

        for (let i = 0; i < 6; i++) {

            const numberToCheck = i + 1;
            const countForSameType = tileSeries.filter(tile => tile[oppositeType] === numberToCheck).length;
            if (countForSameType === 0) {

                const tileMatches = typeToCheck === 'color'
                    ? { color: firstTile.color, symbol: numberToCheck }
                    : { color: numberToCheck, symbol: firstTile.symbol };
                matchingTiles.push(tileMatches);
            }
            if (countForSameType > 1) {
                return [];
            }
        }
        return matchingTiles;
    }

    return [];
}

const findNeighboursForDirection = (directionToCheck: coordinatesTypes, tileToSearch: TileData, tiles: TileData[], factor: number) => {

    const directionValue = tileToSearch[directionToCheck];
    const oppositeDirection: coordinatesTypes = directionToCheck === 'x' ? 'y' : 'x';
    const oppositeDirectionValue = tileToSearch[oppositeDirection];
    const retVal: TileData[] = [];

    for (let i = 1; i < 6; i++) {

        const delta = i * factor;
        if (directionValue - delta < 0) {
            break;
        }
        const tileFound = tiles.filter(item => item[oppositeDirection] === oppositeDirectionValue && item[directionToCheck] === directionValue - delta)[0];
        if (!tileFound || !tileFound.color) {
            break;
        }
        retVal.push(tileFound);
    }
    return retVal;
}

function tileFitsInSeries(matchesForCol: TileSymbols[], color: number | undefined, symbol: number | undefined) {

    if (matchesForCol.length === 0) {
        return true;
    }
    return matchesForCol.filter(tile => matchesColorAndSymbol(tile, color, symbol)).length > 0;
}

function matchesColorAndSymbol(tile: TileSymbols, color: number | undefined, symbol: number | undefined): unknown {
    return tile.color === color && tile.symbol === symbol;
}
