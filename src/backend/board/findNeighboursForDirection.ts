import { TileData, TilePosition } from "../../types";
import { stockConfig } from "../tileStock/stockConfig";

export const enum CoordinatesTypes {
    x = 'x',
    y = 'y'
}
export const enum ForwardBackward {
    forward = -1,
    backward = 1
};
const findNeighboursForDirection = (directionToCheck: CoordinatesTypes, tileToSearch: TilePosition, tilesOfBoard: TileData[], forwardBackward: ForwardBackward) => {

    const directionValue = tileToSearch[directionToCheck];
    const oppositeDirection = directionToCheck === CoordinatesTypes.x ? 'y' : 'x';
    const oppositeDirectionValue = tileToSearch[oppositeDirection];
    const retVal: TileData[] = [];

    for (let i = 1; i < stockConfig.amountOfTiles; i++) {

        const delta = i * forwardBackward;
        if (directionValue - delta < 0) {
            break;
        }
        const tileFound = tilesOfBoard.find(item => item.position[oppositeDirection] === oppositeDirectionValue && item.position[directionToCheck] === directionValue - delta);
        if (!tileFound || !tileFound.symbol) {
            break;
        }
        retVal.push(tileFound);
    }
    return retVal;
};

export { findNeighboursForDirection };