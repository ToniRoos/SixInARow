import React, { FunctionComponent } from "react";
import { SymbolEnum, TileSymbols } from "../../../types";
import { Circle } from "../Tiles/Circle";
import { Hash } from "../Tiles/Hash";
import { Leaf } from "../Tiles/Leaf";
import { Square } from "../Tiles/Square";
import { Star1 } from "../Tiles/Star1";
import { Star2 } from "../Tiles/Star2";
import { TilesFrame } from "../Tiles/TilesFrame";

interface SymbolProps extends TileSymbols {
    tileSize: number;
}
const SymbolSwitch: FunctionComponent<SymbolProps> = ({ color, symbol, tileSize }) => {

    let symbolRendered = undefined;
    switch (symbol) {
        case SymbolEnum.circle:
            symbolRendered = <Circle tileSize={tileSize} />;
            break;
        case SymbolEnum.square:
            symbolRendered = <Square tileSize={tileSize} />;
            break;
        case SymbolEnum.hash:
            symbolRendered = <Hash tileSize={tileSize} />;
            break;
        case SymbolEnum.leaf:
            symbolRendered = <Leaf tileSize={tileSize} />;
            break;
        case SymbolEnum.star1:
            symbolRendered = <Star1 tileSize={tileSize} />;
            break;
        case SymbolEnum.star2:
            symbolRendered = <Star2 tileSize={tileSize} />;
            break;
        default:
            break;
    }

    return (
        <TilesFrame color={color} symbol={symbol} tileSize={tileSize}>
            {symbolRendered}
        </TilesFrame >
    );
}

export { SymbolSwitch };