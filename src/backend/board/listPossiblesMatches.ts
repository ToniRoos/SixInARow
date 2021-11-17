import { TileData, TileSymbols } from "../../types";
import { stockConfig } from "../tileStock/stockConfig";

type TileDescriptor = 'color' | 'symbol';

const listPossiblesMatches = (tileSeries: TileData[], typeToCheck: TileDescriptor) => {

    if (tileSeries.length === 0) {
        return [];
    }

    const tileSeriesSymbols: TileSymbols[] = tileSeries.map(tile => tile.symbol!);

    const oppositeType: TileDescriptor = typeToCheck === 'color' ? 'symbol' : 'color';
    const firstTile = tileSeriesSymbols[0];
    const allOfSameTypeToCheck = tileSeriesSymbols.filter(tile => tile[typeToCheck] === firstTile[typeToCheck]).length === tileSeriesSymbols.length;
    if (allOfSameTypeToCheck) {
        const matchingTiles: TileSymbols[] = [];

        for (let i = 0; i < stockConfig.amountOfTiles; i++) {
            const numberToCheck = i + 1;
            const countForSameType = tileSeriesSymbols.filter(tile => tile[oppositeType] === numberToCheck).length;
            if (countForSameType === 0) {

                const tileMatches: TileSymbols = typeToCheck === 'color'
                    ? ({ color: firstTile.color, symbol: numberToCheck })
                    : ({ color: numberToCheck, symbol: firstTile.symbol });
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

export { listPossiblesMatches };