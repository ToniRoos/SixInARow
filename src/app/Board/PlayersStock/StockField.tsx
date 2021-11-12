import * as React from 'react';
import { drawSymbol } from '../components/Symbol';
import { TileData } from '../../../types';
import { Draggable } from '../components/Draggable';
import { TilePositionContainer } from '../components/TilePositionContainer';

export interface TileProps extends TileData {
    tileSize?: number;
    onDropped?: (props: TileProps) => void;
}

const StockField = (props: TileProps) => {

    const handleDrag = (ev: React.DragEvent<HTMLDivElement>): void => {
        ev.dataTransfer.setData("text", JSON.stringify(props));
    }

    return (
        <Draggable
            allowDrag={props.allowDrag}
            onDragStart={(event) => handleDrag(event)}
        >
            <TilePositionContainer active={true} position={props} tileFilled={props.color && true}>
                {drawSymbol(props.symbol, props.color)}
            </TilePositionContainer>
        </Draggable>
    );
}

export { StockField };