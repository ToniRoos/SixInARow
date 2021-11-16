import React, { Fragment, FunctionComponent } from "react";
import { TileSizeProp } from "./TileSizeProp";

const Star2: FunctionComponent<TileSizeProp> = ({ tileSize }) => {

    const half = tileSize / 2;
    const quarter = tileSize * 0.25;
    const points_5 = tileSize * 0.05;
    const points_38 = tileSize * 0.38;
    const points_62 = tileSize * 0.62;

    return (
        <Fragment>
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} />
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} transform={`rotate(90,  ${half}, ${half})`} />
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} transform={`rotate(180, ${half}, ${half})`} />
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} transform={`rotate(270, ${half}, ${half})`} />
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} transform={`rotate(45,  ${half}, ${half})`} />
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} transform={`rotate(135, ${half}, ${half})`} />
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} transform={`rotate(225, ${half}, ${half})`} />
            <polygon points={`${half},${points_5} ${points_38},${half} ${points_62},${half}`} cx={half} cy={quarter} transform={`rotate(315, ${half}, ${half})`} />
        </Fragment>
    )
}

export { Star2 };