import { TileData } from "../../types";

const printBoardToConsole = (board: TileData[], tileToBePlaced?: TileData) => {

    const table: [string[]] = [[]];
    for (let index = 0; index < 6; index++) {

        const row = board.filter(tile => tile.position.y === index).map((tile: TileData) => {

            if (tileToBePlaced
                && tileToBePlaced.position.x === tile.position.x
                && tileToBePlaced.position.y === tile.position.y) {

                const col = `[ C${tileToBePlaced.symbol!.color}:S${tileToBePlaced.symbol!.symbol} ]`;
                return col;
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