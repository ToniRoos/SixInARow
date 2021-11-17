import { TileSymbols } from "../../types";

const matchesColorAndSymbol = ({ tile, color, symbol }: { tile: TileSymbols; color: number | undefined; symbol: number | undefined; }): boolean => {
    return tile.color === color && tile.symbol === symbol;
}

export { matchesColorAndSymbol };