import { BoardState } from "../app/Board/Board";
import { BoardData, TileData, TilePosition, TileSymbols } from "../types";

type tileDescriptor = 'color' | 'symbol';
type coordinatesTypes = 'x' | 'y';

export function checkBoardSize(directionToCheck: 'x' | 'y', tileToChange: TileData, board: BoardData, sizeX: number, sizeY: number) {

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

export const checkMoveForAlreadyPlayedTilesOfTurn = (tilesOnTurn: TileData[], tileOnBoard: TileData) => {

    const tilesOnTurnSize = tilesOnTurn.length;
    let retVal = false;

    if (tilesOnTurnSize === 0) {
        retVal = true;
    }

    const tileOnBoardPosition: TilePosition = tileOnBoard.position;
    const tilesOnTurnPosition: TilePosition[] = tilesOnTurn.map(tile => ({ ...tile.position }));

    if (tilesOnTurnSize === 1) {

        retVal = tileOnBoardPosition.x === tilesOnTurnPosition[0].x && Math.abs(tileOnBoardPosition.y - tilesOnTurnPosition[0].y) === 1
            || tileOnBoardPosition.y === tilesOnTurnPosition[0].y && Math.abs(tileOnBoardPosition.x - tilesOnTurnPosition[0].x) === 1;
    }

    if (tilesOnTurnSize > 1 && tilesOnTurnSize < 6) {

        const numberInRow = tilesOnTurnPosition.filter(item => item.x === tileOnBoardPosition.x).length;
        const numberInCol = tilesOnTurnPosition.filter(item => item.y === tileOnBoardPosition.y).length;

        if (numberInRow === tilesOnTurnSize) {
            const hasAnyDirectNeighbour = tilesOnTurnPosition.filter(item => Math.abs(item.y - tileOnBoardPosition.y) === 1).length > 0;
            retVal = hasAnyDirectNeighbour;
        }
        if (numberInCol === tilesOnTurnSize) {
            const hasAnyDirectNeighbour = tilesOnTurnPosition.filter(item => Math.abs(item.x - tileOnBoardPosition.x) === 1).length > 0;
            retVal = hasAnyDirectNeighbour;
        }
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
    const allOfSameTypeToCheck = tileSeries.filter(tile => tile.symbol![typeToCheck] === firstTile.symbol![typeToCheck]).length === tileSeries.length;
    if (allOfSameTypeToCheck) {
        const matchingTiles: TileSymbols[] = [];

        for (let i = 0; i < 6; i++) {

            const numberToCheck = i + 1;
            const countForSameType = tileSeries.filter(tile => tile.symbol![oppositeType] === numberToCheck).length;
            if (countForSameType === 0) {

                const tileMatches: TileSymbols = typeToCheck === 'color'
                    ? ({ color: firstTile.symbol!.color, symbol: numberToCheck } as TileSymbols)
                    : ({ color: numberToCheck, symbol: firstTile.symbol } as any);
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

    const directionValue = tileToSearch.position[directionToCheck];
    const oppositeDirection: coordinatesTypes = directionToCheck === 'x' ? 'y' : 'x';
    const oppositeDirectionValue = tileToSearch.position[oppositeDirection];
    const retVal: TileData[] = [];

    for (let i = 1; i < 6; i++) {

        const delta = i * factor;
        if (directionValue - delta < 0) {
            break;
        }
        const tileFound = tiles.filter(item => item.position[oppositeDirection] === oppositeDirectionValue && item.position[directionToCheck] === directionValue - delta)[0];
        if (!tileFound || !tileFound.symbol) {
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
