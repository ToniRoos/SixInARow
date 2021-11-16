import React, { FunctionComponent } from "react";
import { TileSizeProp } from "./TileSizeProp";

const Square: FunctionComponent<TileSizeProp> = ({ tileSize }) => {

    const symbolSize = tileSize * 0.7;
    const margin = tileSize * 0.15;

    return (
        <rect width={symbolSize} height={symbolSize} x={margin} y={margin} />
    )
}

export { Square };