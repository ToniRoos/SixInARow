import { TileSymbols } from "../../types";

export interface StockType {

    getNextTiles: (number: number) => TileSymbols[];
}

const tileStock = (stockProp: TileSymbols[]): StockType => {

    const stock: TileSymbols[] = stockProp;

    const getNextTiles = (number: number) => {

        const tiles = [];
        for (let i = 0; i < number; i++) {

            let max = stock.length - 1;
            let min = 0;
            let tileIndex = Math.floor(Math.random() * (max - min)) + min;
            let tile = stock.splice(tileIndex, 1)[0];
            tiles.push(tile);
        }

        return tiles;
    }

    return {
        getNextTiles
    };
};

export { tileStock };