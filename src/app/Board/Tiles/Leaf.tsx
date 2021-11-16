import React, { Fragment, FunctionComponent } from "react";
import { TileSizeProp } from "./TileSizeProp";

const Leaf: FunctionComponent<TileSizeProp> = ({ tileSize }) => {

    const half = tileSize / 2;
    const quarter = tileSize * 0.25;
    const threeQuarter = tileSize * 0.75;
    const radius = tileSize * 0.17;

    return (
        <Fragment>
            <circle r={radius} cx={half} cy={quarter} />
            <circle r={radius} cx={half} cy={threeQuarter} />
            <circle r={radius} cx={quarter} cy={half} />
            <circle r={radius} cx={threeQuarter} cy={half} />
            <circle r={radius} cx={half} cy={half} />
        </Fragment>
    )
}

export { Leaf };