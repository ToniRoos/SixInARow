import { TileData, SymbolEnum, ColorEnum } from "../../../../types";
import { createDefaultTestField } from "../../../board/fixtures/createDefaultTestField";

const tilesOnBoard: TileData[] = [
    {
        position: { x: 3, y: 3, },
        symbol: {
            symbol: SymbolEnum.square,
            color: ColorEnum.yellow
        }
    },
    {
        position: { x: 3, y: 4, },
        symbol: {
            symbol: SymbolEnum.star2,
            color: ColorEnum.yellow
        }
    },
    {
        position: { x: 4, y: 3, },
        symbol: {
            symbol: SymbolEnum.square,
            color: ColorEnum.blue
        }
    },
    {
        position: { x: 4, y: 2 },
        symbol: {
            symbol: SymbolEnum.circle,
            color: ColorEnum.blue
        }
    }
];

const data5: TileData[] = createDefaultTestField(9, tilesOnBoard);
export { data5 };