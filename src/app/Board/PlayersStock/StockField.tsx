import * as React from 'react';
import { drawSymbol } from '../components/Symbol';
import { TileData } from '../../../types';
import { Draggable } from '../components/Draggable';
import { TilePositionContainer } from '../components/TilePositionContainer';

export interface TileProps {
    tileData: TileData;
    tileSize?: number;
    allowDrag?: boolean;
    onDropped?: (props: TileProps) => void;
}

const StockField = (props: TileProps) => {

    const handleDrag = (ev: React.DragEvent<HTMLDivElement>): void => {
        ev.dataTransfer.setData("text", JSON.stringify(props.tileData));
    }

    return (
        <Draggable
            allowDrag={props.allowDrag}
            onDragStart={(event) => handleDrag(event)}
        >
            <TilePositionContainer active={true} tilePosition={props.tileData.position} tileFilled={props.tileData.symbol && true}>
                {drawSymbol(props.tileData.symbol!)}
            </TilePositionContainer>
        </Draggable>
    );
}

export { StockField };