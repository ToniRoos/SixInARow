import { TileSymbols } from "../../types";
import { StockType, tileStock } from "./tileStock";

const create = () => {

    const stock: TileSymbols[] = [];

    const amountOfColors = 6;
    const amountOfShapes = 6;
    const amountOfSetsPerColor = 3;

    for (let m = 0; m < amountOfSetsPerColor; m++) {
        for (let color = 1; color < amountOfColors + 1; color++) {
            for (let shape = 1; shape < amountOfShapes + 1; shape++) {
                stock.push({ color: color, symbol: shape })
            }
        }
    }

    return tileStock(stock);
}

export const createInitalStock = (): StockType => create();