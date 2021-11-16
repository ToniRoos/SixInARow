import * as React from 'react';
import { SymbolSwitch } from '../components/SymbolSwitch';
import { TileData } from '../../../types';
import { Draggable } from '../components/Draggable';
import { TilePositionContainer } from '../components/TilePositionContainer';

export interface TileProps extends TileData {
    tileSize: number;
    onDropped?: (props: TileData) => void;
}

const PlayingFieldTile: React.FunctionComponent<TileProps> = ({ position, symbol, tileSize, onDropped }) => {

    const [hover, setHover] = React.useState(false);

    const handleAllowDrop = (ev: React.DragEvent<HTMLDivElement>): void => {

        if (symbol) {
            return;
        }

        ev.preventDefault();
        setHover(true);
    }

    const handleDrop = (ev: React.DragEvent<HTMLDivElement>): void => {
        ev.preventDefault();
        var data = JSON.parse(ev.dataTransfer.getData("text")) as TileProps;
        if (onDropped) {
            onDropped({ position, symbol: data.symbol });
        }
        setHover(false);
    }

    return (
        <Draggable
            onDrop={(event => handleDrop(event))}
            onDragOver={event => handleAllowDrop(event)}
            onDragLeave={() => setHover(false)}
        >
            <TilePositionContainer
                active={hover}
                tilePosition={position}
                tileFilled={symbol && true}
                tileSize={tileSize}
            >
                {symbol
                    ? <SymbolSwitch {...symbol} tileSize={tileSize} />
                    : null}
            </TilePositionContainer>
        </Draggable>
    );
}

export { PlayingFieldTile };