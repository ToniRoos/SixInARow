import * as React from 'react';
import { drawSymbol } from '../components/Symbol';
import { TileData } from '../../../types';
import { Draggable } from '../components/Draggable';
import { TilePositionContainer } from '../components/TilePositionContainer';

export interface TileProps extends TileData {
    tileSize?: number;
    onDropped?: (props: TileProps) => void;
}

const BoardField = (props: TileProps) => {

    const [hover, setHover] = React.useState(false);

    const handleAllowDrop = (ev: React.DragEvent<HTMLDivElement>): void => {

        if (props.color) {
            return;
        }

        ev.preventDefault();
        setHover(true);
    }

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>): void => {
        ev.preventDefault();
        var data = JSON.parse(ev.dataTransfer.getData("text")) as TileProps;
        if (props.onDropped) {
            props.onDropped({ x: props.x, y: props.y, color: data.color, symbol: data.symbol, id: data.id });
        }
        setHover(false);
    }

    return (
        <Draggable
            onDrop={(event => handleDrop(event))}
            onDragOver={event => handleAllowDrop(event)}
            onDragLeave={() => setHover(false)}
        >
            <TilePositionContainer active={hover} position={props} tileFilled={props.color && true}>
                {drawSymbol(props.symbol, props.color)}
            </TilePositionContainer>
        </Draggable>
    );
}

export { BoardField };