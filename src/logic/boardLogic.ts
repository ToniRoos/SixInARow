import { BoardProps } from "../Board";
import { TileProps, TileSymbols } from "../Tile";

type tileDescriptor = 'color' | 'symbol';
type coordinatesTypes = 'x' | 'y';

export function executeDrop(tileToChange: TileProps, data: TileProps, board: BoardProps, setBoard: React.Dispatch<React.SetStateAction<BoardProps>>) {
    tileToChange.color = data.color;
    tileToChange.symbol = data.symbol;

    let sizeY = board.sizeY;
    let sizeX = board.sizeX;

    sizeY = checkBoardSize('y', tileToChange, board, sizeX, sizeY);
    sizeX = checkBoardSize('x', tileToChange, board, sizeX, sizeY);

    setBoard(() => {
        return { ...board, sizeY: sizeY, sizeX: sizeX };
    });
}

export function checkBoardSize(directionToCheck: 'x' | 'y', tileToChange: TileProps, board: BoardProps, sizeX: number, sizeY: number) {

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

export const findMatchingTilesByCheckingNeighbours = (tileToSearch: TileProps, color: number | undefined, symbol: number | undefined, tiles: TileProps[]) => {

    const tilesCol: TileProps[] = [
        ...findNeighboursForDirection('y', tileToSearch, tiles, 1),
        ...findNeighboursForDirection('y', tileToSearch, tiles, -1)
    ];
    if (tilesCol.length > 5) {
        return;
    }

    var matchesForColorForCol = listPossiblesMatches(tilesCol, 'color');
    var matchesForSymbolForCol = listPossiblesMatches(tilesCol, 'symbol');
    var matchesForCol = [...matchesForColorForCol, ...matchesForSymbolForCol];

    const tilesRow: TileProps[] = [
        ...findNeighboursForDirection('x', tileToSearch, tiles, 1),
        ...findNeighboursForDirection('x', tileToSearch, tiles, -1)
    ];
    if (tilesRow.length > 5) {
        return;
    }

    var matchesForColorForRow = listPossiblesMatches(tilesRow, 'color');
    var matchesForSymbolForRow = listPossiblesMatches(tilesRow, 'symbol');
    var matchesForRow = [...matchesForColorForRow, ...matchesForSymbolForRow];

    if (matchesForCol.length === 0 && matchesForRow.length === 0 && tiles.length > 9) {
        return false;
    }

    return tileFitsInSeries(matchesForCol, color, symbol) && tileFitsInSeries(matchesForRow, color, symbol);
}

const listPossiblesMatches = (tileSeries: TileProps[], typeToCheck: tileDescriptor) => {

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

const findNeighboursForDirection = (directionToCheck: coordinatesTypes, tileToSearch: TileProps, tiles: TileProps[], factor: number) => {

    const directionValue = tileToSearch[directionToCheck];
    const oppositeDirection: coordinatesTypes = directionToCheck === 'x' ? 'y' : 'x';
    const oppositeDirectionValue = tileToSearch[oppositeDirection];
    const retVal: TileProps[] = [];

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
