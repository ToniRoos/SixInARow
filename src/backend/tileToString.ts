import { TileData, TileSymbols } from "../types";

const tileToString = (tile?: (TileData)) => {

    if (!tile) {
        return 'Tile is undefined';
    }

    return `Tile[x:${tile.position.x},y:${tile.position.y}${tile.symbol ? `,symbol:${tile.symbol.symbol},color:${tile.symbol.color}` : ''}]`;
}

const tileSymbolToString = (tile?: (TileSymbols)) => {

    if (!tile) {
        return 'Tile is undefined';
    }
    return `Tile[symbol:${tile.symbol},color:${tile.color}]`;
}

export { tileToString, tileSymbolToString };