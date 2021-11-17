import { ColorEnum, SymbolEnum, TileData, TileSymbols } from "../../types";
import { createTestTile } from "./fixtures/createTestTile";
import { listPossiblesMatches } from "./listPossiblesMatches";

describe('List possible matches', () => {

    it('returns nothing for empty list', () => {
        const tileSeries: TileData[] = [];
        const possibleMatches: TileSymbols[] = listPossiblesMatches(tileSeries, 'color');

        expect(possibleMatches.length).toBe(0);
    });

    it('returns all other symbols to match for same color of one played tile', () => {
        const tileSeries: TileData[] = [
            createTestTile({ symbol: { color: ColorEnum.blue, symbol: SymbolEnum.circle } })
        ];

        const possibleMatches: TileSymbols[] = listPossiblesMatches(tileSeries, 'color');
        console.log(possibleMatches)

        expect(possibleMatches.length).toBe(5);
        expect(possibleMatches.find(tile => tile.symbol === SymbolEnum.circle)).toBeUndefined();
    });

    it('returns all other colors to match for same symbol of one played tile', () => {
        const tileSeries: TileData[] = [
            createTestTile({ symbol: { color: ColorEnum.blue, symbol: SymbolEnum.circle } })
        ];

        const possibleMatches: TileSymbols[] = listPossiblesMatches(tileSeries, 'symbol');
        console.log(possibleMatches)

        expect(possibleMatches.length).toBe(5);
        expect(possibleMatches.find(tile => tile.color === ColorEnum.blue)).toBeUndefined();
    });

    it('returns 4 matches for same symbol of two played tiles', () => {
        const tileSeries: TileData[] = [
            createTestTile({ symbol: { color: ColorEnum.blue, symbol: SymbolEnum.circle } }),
            createTestTile({ symbol: { color: ColorEnum.yellow, symbol: SymbolEnum.circle } })
        ];
        const possibleMatches: TileSymbols[] = listPossiblesMatches(tileSeries, 'symbol');
        console.log(possibleMatches)

        expect(possibleMatches.length).toBe(4);
        expect(possibleMatches.find(tile => tile.color === ColorEnum.blue || tile.color === ColorEnum.yellow)).toBeUndefined();
    });

    it('returns nothin for max played tiles in series', () => {
        const tileSeries: TileData[] = [
            createTestTile({ symbol: { color: ColorEnum.blue, symbol: SymbolEnum.circle } }),
            createTestTile({ symbol: { color: ColorEnum.yellow, symbol: SymbolEnum.circle } }),
            createTestTile({ symbol: { color: ColorEnum.green, symbol: SymbolEnum.circle } }),
            createTestTile({ symbol: { color: ColorEnum.orange, symbol: SymbolEnum.circle } }),
            createTestTile({ symbol: { color: ColorEnum.purple, symbol: SymbolEnum.circle } }),
            createTestTile({ symbol: { color: ColorEnum.red, symbol: SymbolEnum.circle } }),
        ];
        const possibleMatches: TileSymbols[] = listPossiblesMatches(tileSeries, 'symbol');
        console.log(possibleMatches)

        expect(possibleMatches.length).toBe(0);
    });

    it('returns nothing for different symbols of two played tiles', () => {
        const tileSeries: TileData[] = [
            createTestTile({ symbol: { color: ColorEnum.blue, symbol: SymbolEnum.circle } }),
            createTestTile({ symbol: { color: ColorEnum.yellow, symbol: SymbolEnum.hash } })
        ];
        const possibleMatches: TileSymbols[] = listPossiblesMatches(tileSeries, 'symbol');
        console.log(possibleMatches)

        expect(possibleMatches.length).toBe(0);
    });
});