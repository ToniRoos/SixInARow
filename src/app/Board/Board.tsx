import * as React from 'react';
import { TileProps } from './PlayingField/PlayingFieldTile';
import { BoardData, TileSymbols } from '../../types';
import { StockRegion } from './PlayersStock/StockRegion';
import { PlayingField } from './PlayingField/PlayingFIeld';
import { StatusText } from './PlayingField/StatusText';
import { useAppContext } from '../useAppContext';
import { useCheckMove } from './hooks/useCheckMove';
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

    const { sessionId: id, tileSize } = useAppContext();

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
        <React.Fragment>
            <StatusText statusText={activeTurn ? "It's your turn" : `It's turn of ${activePlayer}`} />
            <PlayingField sizeX={board.sizeX} sizeY={board.sizeY} tileSize={tileSize} >
                <PlayingFieldList tileSize={tileSize} tiles={board.tiles} onDropped={checkTileForMove} />
            </PlayingField>
            <StockRegion
                tilesOnHand={tilesOnHand}
                turnActive={activeTurn}
                onNextButtonClicked={handleNextButtonClick} />
        </React.Fragment>
    );
};

export { Board };
