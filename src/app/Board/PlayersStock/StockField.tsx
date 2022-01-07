import * as React from 'react';
import { SymbolSwitch } from '../components/SymbolSwitch';
import { TileData } from '../../../types';
import { Draggable } from '../components/Draggable';
import { TilePositionContainer } from '../components/TilePositionContainer';
import { TileStyleContainer } from '../components/TileStyleContainer';

export interface TileProps {
    tileData: TileData;
    tileSize: number;
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
            onDragStart={(event) => handleDrag(event)}>
            <TileStyleContainer active={true} tileFilled={true}>
                <SymbolSwitch {...props.tileData.symbol!} tileSize={props.tileSize!} />
            </TileStyleContainer>
        </Draggable>
    );
}

export { StockField };