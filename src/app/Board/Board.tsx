import * as React from 'react';
import { TileProps } from './PlayingField/PlayingFieldTile';
import { BoardData, TileSymbols } from '../../types';
import { StockRegion } from './PlayersStock/StockRegion';
import { PlayingField } from './PlayingField/PlayingFIeld';
import { StatusText } from './PlayingField/StatusText';
import { useAppContext } from '../useAppContext';
import { useCheckMove } from './hooks/useCheckMove';
import { getTileSize } from '../getTileSize';
import { PlayingFieldList } from './PlayingField/PlayingFieldList';
import { useGameState } from './hooks/useGameState';
import { useNextTurn } from './hooks/useNextTurn';

export interface BoardState {
    turnActive: boolean;
    board: BoardData;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileProps[];
}

const Board = () => {

    const tileSize = getTileSize();
    const { sessionId: id } = useAppContext();

    const { board, activePlayer, activeTurn, tilesOnHand } = useGameState(id!);
    const { nextTurn } = useNextTurn(id!);
    const { checkTileForMove } = useCheckMove(id!);

    if (!board) {
        return <React.Fragment />;
    }

    const handleNextButtonClick = () => {
        nextTurn();
    }

    return (
        <div className="vh-100 d-flex flex-column align-items-center">
            <StatusText statusText={activeTurn ? "It's your turn" : `It's turn of ${activePlayer}`} />
            <PlayingField sizeX={board.sizeX} sizeY={board.sizeY} tileSize={tileSize} >
                <PlayingFieldList tileSize={tileSize} tiles={board.tiles} onDropped={checkTileForMove} />
            </PlayingField>
            <StockRegion
                tilesOnHand={tilesOnHand}
                turnActive={activeTurn}
                onNextButtonClicked={handleNextButtonClick} />
        </div>
    );
};

export { Board };
