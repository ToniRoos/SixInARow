import { TileSymbols } from "../../types";
import { stockConfig } from "./stockConfig";
import { TileStock, tileStock } from "./tileStock";

const create = () => {

    const stock: TileSymbols[] = [];

    const amountOfColors = stockConfig.amountOfColors;
    const amountOfShapes = stockConfig.amountOfShapes;
    const amountOfSetsPerColor = stockConfig.amountOfSetsPerColor;

    for (let m = 0; m < amountOfSetsPerColor; m++) {
        for (let color = 1; color < amountOfColors + 1; color++) {
            for (let shape = 1; shape < amountOfShapes + 1; shape++) {
                stock.push({ color: color, symbol: shape })
            }
        }
    }

    return tileStock(stock);
}

export const createStock = (): TileStock => create();