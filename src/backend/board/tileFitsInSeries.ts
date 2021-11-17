import { TileSymbols } from "../../types";
import { matchesColorAndSymbol } from "./matchesColorAndSymbol";

const tileFitsInSeries = (matchesForSeries: TileSymbols[], color: number | undefined, symbol: number | undefined) => {

    if (matchesForSeries.length === 0) {
        return true;
    }
    return matchesForSeries.find(tile => matchesColorAndSymbol({ tile, color, symbol })) !== undefined;
}

export { tileFitsInSeries };