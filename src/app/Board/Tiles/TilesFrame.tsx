import React, { FunctionComponent } from "react";
import { ColorEnum, TileSymbols } from "../../../types";
import { useAppContext } from "../../useAppContext";

interface TileFrameProps extends TileSymbols {
    tileSize: number;
}
const TilesFrame: FunctionComponent<TileFrameProps> = ({ children, color, tileSize }) => {

    const colorClassName = `symbol color-${ColorEnum[color ? color : 0]}`;
    return (
        <svg width={tileSize} height={tileSize} className={colorClassName}>
            {children}
        </svg>
    );
};

export { TilesFrame };