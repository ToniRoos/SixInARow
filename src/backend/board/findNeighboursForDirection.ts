import { TileData, TilePosition } from "../../types";
import { stockConfig } from "../tileStock/stockConfig";

export const enum CoordinatesType {
    horizontal = 'x',
    vertical = 'y'
}
export const enum ForwardBackward {
    forward = -1,
    backward = 1
};
const findNeighboursForDirection = (directionToCheck: CoordinatesType, tileToLookForNeighbours: TilePosition, tilesOfBoard: TileData[], forwardBackward: ForwardBackward): TileData[] => {

    const directionValue = tileToLookForNeighbours[directionToCheck];
    const oppositeDirection = directionToCheck === CoordinatesType.horizontal ? 'y' : 'x';
    const oppositeDirectionValue = tileToLookForNeighbours[oppositeDirection];
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

const findNeighboursHorizontal = (tileToLookForNeighbours: TilePosition, tilesOfBoard: TileData[]): TileData[] => {

    const neighboursHorizontalForward = findNeighboursForDirection(CoordinatesType.horizontal, tileToLookForNeighbours, tilesOfBoard, ForwardBackward.forward);
    const neighboursHorizontalBackward = findNeighboursForDirection(CoordinatesType.horizontal, tileToLookForNeighbours, tilesOfBoard, ForwardBackward.backward);

    return [
        ...neighboursHorizontalForward,
        ...neighboursHorizontalBackward
    ];
};

const findNeighboursVertical = (tileToLookForNeighbours: TilePosition, tilesOfBoard: TileData[]): TileData[] => {

    const neighboursVerticalForward = findNeighboursForDirection(CoordinatesType.vertical, tileToLookForNeighbours, tilesOfBoard, ForwardBackward.forward);
    const neighboursVerticalBackward = findNeighboursForDirection(CoordinatesType.vertical, tileToLookForNeighbours, tilesOfBoard, ForwardBackward.backward);

    return [
        ...neighboursVerticalForward,
        ...neighboursVerticalBackward
    ];
};

export {
    findNeighboursForDirection,
    findNeighboursHorizontal,
    findNeighboursVertical
};