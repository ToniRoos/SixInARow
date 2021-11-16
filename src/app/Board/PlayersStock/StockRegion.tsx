import * as React from 'react';
import { TileSymbols } from '../../../types';
import { StockField } from './StockField';
import { getTileSize } from '../../getTileSize';

export interface StockRegionProps {
    tilesOnHand?: TileSymbols[];
    turnActive?: boolean;
    onNextButtonClicked: () => void;
}

const StockRegion: React.FunctionComponent<StockRegionProps> = ({ tilesOnHand, turnActive, onNextButtonClicked }) => {

    tilesOnHand = tilesOnHand ? tilesOnHand : [];
    const tileSize = getTileSize();
    const tilesOnHandRendered = tilesOnHand.map((symbolTile, index) => <StockField
        key={index}
        allowDrag={turnActive}
        tileData={{ position: { x: index, y: 0 }, symbol: symbolTile }}
    />);

    return (
        <div style={{ width: `${tileSize * tilesOnHandRendered.length}px`, height: `${tileSize}px`, position: "fixed", bottom: "0" }} className="d-flex flex-wrap">
            {tilesOnHandRendered}
            {turnActive ? <button type="button" className="btn btn-outline-success" style={{ marginLeft: `${(tileSize * tilesOnHandRendered.length) + 20}px` }}
                onClick={onNextButtonClicked}>
                NEXT
            </button> : undefined}
        </div>
    );
}

export { StockRegion };

