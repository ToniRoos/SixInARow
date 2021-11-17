import { ColorEnum, SymbolEnum, TileData } from "../../../types";

const defaultTile: TileData = {
    position: {
        x: 0,
        y: 0
    },
    symbol: {
        color: ColorEnum.blue,
        symbol: SymbolEnum.circle
    }
}

const createTestTile = (overwrites: Partial<TileData>): TileData => ({
    ...defaultTile,
    ...overwrites
});

export { createTestTile };