import * as React from 'react';
import { ws } from '../../logic/ws';
import { TileProps } from './PlayingField/BoardField';
import { BoardData, TileSymbols } from '../../types';
import { StockRegion } from './PlayersStock/StockRegion';
import { PlayingField } from './PlayingField/PlayingFIeld';
import { StatusText } from './PlayingField/StatusText';

export interface BoardState {
    turnActive: boolean;
    board: BoardData;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileProps[];
}

const Board = () => {

    const [gameData, setGameData] = React.useState<BoardState>();

    if (!gameData) {
        return <React.Fragment />;
    }

    React.useEffect(() => {

        ws.onCommand('RefreshBoard', (command) => {

            setGameData(() => { return { ...gameData, ...command.data } })
        });
    }, []);

    const checkDrop = (data: TileProps) => {
        // ws.sendCommand({ command: 'CheckMove', data: data });
    }

    return <div className="vh-100 d-flex flex-column align-items-center">
        <StatusText statusText={gameData.turnActive ? "It's your turn" : `It's turn of ${gameData.board.activePlayer}`} />
        <PlayingField board={gameData.board} handleDrop={checkDrop} />
        <StockRegion tilesOnHand={gameData.tilesOnHand} turnActive={gameData.turnActive} />
    </div>
}

export default Board;
