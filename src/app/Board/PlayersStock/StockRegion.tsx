import React from 'react';
import { TileSymbols } from '../../../types';
import { StockField } from './StockField';
import { useAppContext } from '../../useAppContext';
import { StockButton } from './StockButton';

export interface StockRegionProps {
    tilesOnHand?: TileSymbols[];
    turnActive?: boolean;
    onNextButtonClicked: () => void;
}

const StockRegion: React.FunctionComponent<StockRegionProps> = ({ tilesOnHand, turnActive, onNextButtonClicked }) => {

    const { setTileSize, tileSize } = useAppContext();
    const stockStileSize = 80;

    tilesOnHand = tilesOnHand ? tilesOnHand : [];
    const tilesOnHandRendered = tilesOnHand.map((symbolTile, index) => <StockField
        key={index}
        allowDrag={turnActive}
        tileData={{ position: { x: index, y: 0 }, symbol: symbolTile }}
        tileSize={stockStileSize}
    />);

    const onhandleMinus = () => {
        setTileSize(tileSize - 10);
    }

    const onhandlePlus = () => {
        setTileSize(tileSize + 10);
    }

    return (
        <div style={{ width: `${stockStileSize * tilesOnHandRendered.length}px`, height: `${stockStileSize}px`, position: "fixed", bottom: "0" }} className="d-flex flex-wrap">
            {tilesOnHandRendered}
            {turnActive ?
                <StockButton leftSpace={(stockStileSize * tilesOnHandRendered.length) + 20} onClick={onNextButtonClicked}>
                    NEXT
                </StockButton>
                : undefined}
            <StockButton leftSpace={(stockStileSize * (tilesOnHandRendered.length + 1)) + 20} onClick={onhandleMinus}>
                ---
            </StockButton>
            <StockButton leftSpace={(stockStileSize * (tilesOnHandRendered.length + 2)) + 20} onClick={onhandlePlus}>
                +++
            </StockButton>
        </div>
    );
}

export { StockRegion };

