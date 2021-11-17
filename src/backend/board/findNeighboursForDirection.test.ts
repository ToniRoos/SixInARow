import { TileData, TilePosition } from "../../types";
import { CoordinatesTypes, findNeighboursForDirection, ForwardBackward } from "./findNeighboursForDirection";
import { createDefaultTestField } from "./fixtures/createDefaultTestField";
import { createTestTile } from "./fixtures/createTestTile";

describe('Find Neighbours for direction', () => {

    it('returns nothing for empty board when searching in x direction and forward', () => {
        const tileToFindNeichbours: TilePosition = { x: 0, y: 0 };
        const testBoard = createDefaultTestField(9, []);
        const foundNeighbours: TileData[] = findNeighboursForDirection(CoordinatesTypes.x, tileToFindNeichbours, testBoard, ForwardBackward.forward);

        expect(foundNeighbours.length).toBe(0);
    });

    it('returns nothing for empty board when searching in x direction and backward', () => {
        const tileToFindNeichbours: TilePosition = { x: 0, y: 0 };
        const testBoard = createDefaultTestField(9, []);
        const foundNeighbours: TileData[] = findNeighboursForDirection(CoordinatesTypes.x, tileToFindNeichbours, testBoard, ForwardBackward.backward);

        expect(foundNeighbours.length).toBe(0);
    });

    it('returns one neighbour when searching in x direction and forward', () => {
        const tileToFindNeichbours: TilePosition = { x: 0, y: 0 };
        const testBoard = createDefaultTestField(9, [
            createTestTile({ position: { x: 1, y: 0 } })
        ]);

        const foundNeighbours: TileData[] = findNeighboursForDirection(CoordinatesTypes.x, tileToFindNeichbours, testBoard, ForwardBackward.forward);

        expect(foundNeighbours.length).toBe(1);
    });

    it('returns one neighbour when searching in x direction and backward', () => {
        const tileToFindNeichbours: TilePosition = { x: 1, y: 1 };
        const testBoard = createDefaultTestField(9, [
            createTestTile({ position: { x: 0, y: 1 } })
        ]);

        const foundNeighbours: TileData[] = findNeighboursForDirection(CoordinatesTypes.x, tileToFindNeichbours, testBoard, ForwardBackward.backward);

        expect(foundNeighbours.length).toBe(1);
    });

    it('returns no neighbour when searching in x direction and backward at sideline', () => {
        const tileToFindNeichbours: TilePosition = { x: 0, y: 1 };
        const testBoard = createDefaultTestField(9, [
            createTestTile({ position: { x: 1, y: 1 } })
        ]);

        const foundNeighbours: TileData[] = findNeighboursForDirection(CoordinatesTypes.x, tileToFindNeichbours, testBoard, ForwardBackward.backward);

        expect(foundNeighbours.length).toBe(0);
    });

    it('returns two neighbours when searching in y direction and forward', () => {
        const tileToFindNeichbours: TilePosition = { x: 0, y: 0 };
        const testBoard = createDefaultTestField(10, [
            createTestTile({ position: { x: 0, y: 1 } }),
            createTestTile({ position: { x: 0, y: 2 } })
        ]);

        const foundNeighbours: TileData[] = findNeighboursForDirection(CoordinatesTypes.y, tileToFindNeichbours, testBoard, ForwardBackward.forward);

        expect(foundNeighbours.length).toBe(2);
    });

});