import { TileData, TilePosition } from "../../types";
import { stockConfig } from "../tileStock/stockConfig";
import { CoordinatesTypes, findNeighboursForDirection, ForwardBackward } from "./findNeighboursForDirection";
import { listPossiblesMatches } from "./listPossiblesMatches";
import { tileFitsInSeries } from "./tileFitsInSeries";

const findMatchingTilesByCheckingNeighbours = (tileToSearch: TilePosition, color: number | undefined, symbol: number | undefined, tilesOfBoard: TileData[]) => {

    const directNeighboursInColumn: TileData[] = [
        ...findNeighboursForDirection(CoordinatesTypes.y, tileToSearch, tilesOfBoard, ForwardBackward.forward),
        ...findNeighboursForDirection(CoordinatesTypes.y, tileToSearch, tilesOfBoard, ForwardBackward.backward)
    ];

    if (directNeighboursInColumn.length > stockConfig.amountOfTiles - 1) {
        return false;
    }

    var matchesForColorForCol = listPossiblesMatches(directNeighboursInColumn, 'color');
    var matchesForSymbolForCol = listPossiblesMatches(directNeighboursInColumn, 'symbol');
    var matchesForCol = [...matchesForColorForCol, ...matchesForSymbolForCol];

    if (directNeighboursInColumn.length > 0 && matchesForCol.length === 0) {
        return false;
    }

    const directNeighboursInRow: TileData[] = [
        ...findNeighboursForDirection(CoordinatesTypes.x, tileToSearch, tilesOfBoard, ForwardBackward.forward),
        ...findNeighboursForDirection(CoordinatesTypes.x, tileToSearch, tilesOfBoard, ForwardBackward.backward)
    ];
    if (directNeighboursInRow.length > stockConfig.amountOfTiles - 1) {
        return false;
    }

    var matchesForColorForRow = listPossiblesMatches(directNeighboursInRow, 'color');
    var matchesForSymbolForRow = listPossiblesMatches(directNeighboursInRow, 'symbol');
    var matchesForRow = [...matchesForColorForRow, ...matchesForSymbolForRow];

    if (directNeighboursInRow.length > 0 && matchesForRow.length === 0) {
        return false;
    }

    if (matchesForCol.length === 0 && matchesForRow.length === 0 && tilesOfBoard.length > 9) {
        return false;
    }

    return tileFitsInSeries(matchesForCol, color, symbol) && tileFitsInSeries(matchesForRow, color, symbol);
}

export { findMatchingTilesByCheckingNeighbours };