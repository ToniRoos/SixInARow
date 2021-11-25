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
    const stockTileSize = 80;

    tilesOnHand = tilesOnHand ? tilesOnHand : [];
    const tilesOnHandRendered = tilesOnHand.map((symbolTile, index) => <StockField
        key={index}
        allowDrag={turnActive}
        tileData={{ position: { x: index, y: 0 }, symbol: symbolTile }}
        tileSize={stockTileSize}
    />);

    const onhandleMinus = () => {
        setTileSize(tileSize - 10);
    }

    const onhandlePlus = () => {
        setTileSize(tileSize + 10);
    }

    return (
        <div className="d-flex flex-grow-1 align-items-center">
            <div className="d-flex flex-wrap">
                <StockButton onClick={onhandleMinus}>
                    -
                </StockButton>
                <StockButton onClick={onhandlePlus}>
                    +
                </StockButton>
                {tilesOnHandRendered}
                <StockButton onClick={onNextButtonClicked}>
                    NEXT
                </StockButton>
            </div>
        </div>
    );
}

export { StockRegion };

