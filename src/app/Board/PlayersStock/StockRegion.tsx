import * as React from 'react';
import { TileSymbols } from '../../../types';
import { StockField } from './StockField';
import { ws } from '../../../logic/ws';
import { getTileSize } from '../../getTileSize';

export interface StockRegionProps {
    tilesOnHand: TileSymbols[];
    turnActive: boolean;
}

const StockRegion: React.FunctionComponent<StockRegionProps> = ({ tilesOnHand, turnActive }) => {

    const tileSize = getTileSize();
    const tilesOnHandRendered = tilesOnHand.map((tile, index) => <StockField key={index} x={index} y={0} allowDrag={turnActive} {...tile} />);

    return (
        <div style={{ width: `${tileSize * tilesOnHandRendered.length}px`, height: `${tileSize}px`, position: "fixed", bottom: "0" }} className="d-flex flex-wrap">
            {tilesOnHandRendered}
            {turnActive ? <button type="button" className="btn btn-outline-success" style={{ marginLeft: `${(tileSize * tilesOnHandRendered.length) + 20}px` }}
                onClick={() => {
                    // ws.sendCommand({ command: 'NextTurn' })
                }}>
                NEXT
            </button> : undefined}
        </div>
    );
}

export { StockRegion };

