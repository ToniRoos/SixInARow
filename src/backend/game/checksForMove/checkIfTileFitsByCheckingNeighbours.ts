import { TileData, TilePosition } from "../../../types";
import { stockConfig } from "../../tileStock/stockConfig";
import { findNeighboursHorizontal, findNeighboursVertical } from "../../board/findNeighboursForDirection";
import { listPossiblesMatches } from "../../board/listPossiblesMatches";
import { tileFitsInSeries } from "../../board/tileFitsInSeries";

const checkIfTileFitsByCheckingNeighbours = (tileToSearch: TilePosition, color: number | undefined, symbol: number | undefined, tilesOfBoard: TileData[]) => {

    const directNeighboursVertical: TileData[] = findNeighboursVertical(tileToSearch, tilesOfBoard);
    if (directNeighboursVertical.length > stockConfig.amountOfTiles - 1) {
        return false;
    }

    var matchesVerticalForColor = listPossiblesMatches(directNeighboursVertical, 'color');
    var matchesVerticalForSymbol = listPossiblesMatches(directNeighboursVertical, 'symbol');
    var matchesVertical = [...matchesVerticalForColor, ...matchesVerticalForSymbol];

    if (directNeighboursVertical.length > 0 && matchesVertical.length === 0) {
        return false;
    }

    const directNeighboursHorizontal: TileData[] = findNeighboursHorizontal(tileToSearch, tilesOfBoard);
    if (directNeighboursHorizontal.length > stockConfig.amountOfTiles - 1) {
        return false;
    }

    var matchesHorizontalForColor = listPossiblesMatches(directNeighboursHorizontal, 'color');
    var matchesHorizontalForSymbol = listPossiblesMatches(directNeighboursHorizontal, 'symbol');
    var matchesHorizontal = [...matchesHorizontalForColor, ...matchesHorizontalForSymbol];

    if (directNeighboursHorizontal.length > 0 && matchesHorizontal.length === 0) {
        return false;
    }

    if (matchesVertical.length === 0 && matchesHorizontal.length === 0 && tilesOfBoard.length > 9) {
        return false;
    }

    return tileFitsInSeries(matchesVertical, color, symbol) && tileFitsInSeries(matchesHorizontal, color, symbol);
}

export { checkIfTileFitsByCheckingNeighbours };