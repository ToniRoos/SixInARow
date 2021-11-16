import React, { FunctionComponent } from "react";
import { TileSizeProp } from "./TileSizeProp";

const Circle: FunctionComponent<TileSizeProp> = ({ tileSize }) => {

    const center = tileSize / 2;
    const radius = tileSize * 0.4;

    return (
        <circle r={radius} cx={center} cy={center} />
    )
}

export { Circle };