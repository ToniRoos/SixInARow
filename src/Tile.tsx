import * as React from 'react';
import { ColorEnum, drawSymbol, SymbolEnum } from './Symbol';

export interface TileSymbols {
    id?: number;
    color?: ColorEnum;
    symbol?: SymbolEnum;
}

export interface TileProps extends TileSymbols {
    x: number;
    y: number;
    allowDrag?: boolean;
    tileSize?: number;
    onDropped?: (props: TileProps) => void;
}

const Tile = (props: TileProps) => {

    const tileSize = props.tileSize ? props.tileSize : 100;

    function allowDrop(ev: any) {

        if (props.color) {
            return;
        }

        ev.preventDefault();
    }

    function drop(ev: any) {
        ev.preventDefault();
        var data = JSON.parse(ev.dataTransfer.getData("text")) as TileProps;
        if (props.onDropped) {
            props.onDropped({ x: props.x, y: props.y, color: data.color, symbol: data.symbol, id: data.id });
        }
    }

    function drag(ev: any) {
        ev.dataTransfer.setData("text", JSON.stringify(props));
    }

    const bgColor = props.color ? "bg-dark text-white" : "bg-transparent";

    return <div draggable={props.allowDrag}
        onDragOver={event => allowDrop(event)}
        onDragStart={(event) => drag(event)}
        onDrop={(event => drop(event))}
        style={{
            width: `${props.tileSize}px`, height: `${props.tileSize}px`,
            marginLeft: `${props.x * tileSize}px`,
            marginTop: `${props.y * tileSize}px`
        }} className={`${bgColor} border position-absolute rounded d-flex align-items-center justify-content-center`}>
        {drawSymbol(props.symbol, props.color)}
    </div>
}

export default Tile;