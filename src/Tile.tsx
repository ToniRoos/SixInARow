import * as React from 'react';
import { drawSymbol } from './Symbol';
import { TileData } from './types';

export interface TileProps extends TileData {
    tileSize?: number;
    onDropped?: (props: TileProps) => void;
}

const Tile = (props: TileProps) => {

    const [hover, setHover] = React.useState(false);
    const tileSize = props.tileSize ? props.tileSize : 100;

    function allowDrop(ev: any) {

        if (props.color) {
            return;
        }

        ev.preventDefault();
        setHover(true);
    }

    function drop(ev: any) {
        ev.preventDefault();
        var data = JSON.parse(ev.dataTransfer.getData("text")) as TileProps;
        if (props.onDropped) {
            props.onDropped({ x: props.x, y: props.y, color: data.color, symbol: data.symbol, id: data.id });
        }
        setHover(false);
    }

    function drag(ev: any) {
        ev.dataTransfer.setData("text", JSON.stringify(props));
    }

    const bgEmptyField = hover ? "bg-half-transparent" : "bg-transparent";
    const bgColor = props.color ? "bg-dark text-white" : bgEmptyField;

    return <div draggable={props.allowDrag}
        onDragOver={event => allowDrop(event)}
        onDragLeave={() => setHover(false)}
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