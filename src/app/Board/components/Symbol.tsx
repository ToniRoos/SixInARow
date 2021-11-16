import React from "react";
import { ColorEnum, SymbolEnum, TileSymbols } from "../../../types";

export const drawSymbol = ({ symbol, color }: TileSymbols) => {

    let retVal = <svg />;
    const colorClassName = `symbol color-${ColorEnum[color ? color : 0]}`;
    switch (symbol) {
        case SymbolEnum.circle:
            retVal = <svg width={100} height={100} className={colorClassName}>
                <circle r={40} cx={50} cy={50} />
            </svg>;
            break;
        case SymbolEnum.square:
            retVal = <svg width={100} height={100} className={colorClassName}>
                <rect width={70} height={70} x={15} y={15} />
            </svg>;
            break;
        case SymbolEnum.hash:
            retVal = <svg width={100} height={100} className={colorClassName}>
                <rect width={60} height={60} x={15} y={15} transform="translate(50,-15) rotate(45)" />
            </svg>;
            break;
        case SymbolEnum.leaf:
            retVal = <svg width={100} height={100} className={colorClassName}>
                <circle r={17} cx={50} cy={25} />
                <circle r={17} cx={50} cy={75} />
                <circle r={17} cx={25} cy={50} />
                <circle r={17} cx={75} cy={50} />
                <circle r={17} cx={50} cy={50} />
            </svg>;
            break;
        case SymbolEnum.star1:
            retVal = <svg width={100} height={100} className={colorClassName}>
                <polygon points="50,0 38,50 62,50" cx={50} cy={25} transform="rotate(45, 50, 50)" />
                <polygon points="50,0 38,50 62,50" cx={50} cy={25} transform="rotate(135, 50, 50)" />
                <polygon points="50,0 38,50 62,50" cx={50} cy={25} transform="rotate(225, 50, 50)" />
                <polygon points="50,0 38,50 62,50" cx={50} cy={25} transform="rotate(315, 50, 50)" />
            </svg>;
            break;
        case SymbolEnum.star2:
            retVal = <svg width={100} height={100} className={colorClassName}>
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} />
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} transform="rotate(90, 50, 50)" />
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} transform="rotate(180, 50, 50)" />
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} transform="rotate(270, 50, 50)" />
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} transform="rotate(45, 50, 50)" />
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} transform="rotate(135, 50, 50)" />
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} transform="rotate(225, 50, 50)" />
                <polygon points="50,5 38,50 62,50" cx={50} cy={25} transform="rotate(315, 50, 50)" />
            </svg>;
            break;

        default:
            break;
    }
    return retVal;
}