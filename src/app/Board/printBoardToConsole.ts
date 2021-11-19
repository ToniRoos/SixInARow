import { TileData, TilePosition } from "../../types";

const printBoardToConsole = (board: TileData[], tilesToBePlaced?: TileData[]) => {

    const table: [string[]] = [[]];
    for (let index = 0; index < 6; index++) {

        const row = board.filter(tile => tile.position.y === index).map((tile: TileData) => {

            if (tilesToBePlaced) {

                const tileToPlace = tilesToBePlaced.find(
                    tileToPlace =>
                        tileToPlace.position.x === tile.position.x
                        && tileToPlace.position.y === tile.position.y
                );

                if (tileToPlace) {
                    const col = `[ C${tileToPlace.symbol!.color}:S${tileToPlace.symbol!.symbol} ]`;
                    return col;
                }
            }

            if (tile.symbol) {

                const col = `C${tile.symbol.color}:S${tile.symbol.symbol}`;
                return col;
            } else {
                return "--";
            }
        });

        table.push(row);
        table.push([]);
    }
    console.table(table);
}

export { printBoardToConsole };