import React, { FunctionComponent } from "react";
import { TileSizeProp } from "./TileSizeProp";

const Hash: FunctionComponent<TileSizeProp> = ({ tileSize }) => {

    const center = tileSize / 2;
    const symbolSize = tileSize * 0.6;
    const margin = tileSize * 0.15;

    return (
        <rect
            width={symbolSize}
            height={symbolSize}
            x={margin}
            y={margin}
            transform={`translate(${center},-${margin}) rotate(45)`} />
    )
}

export { Hash };