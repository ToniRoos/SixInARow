import * as React from 'react';
import { ws } from './logic/ws';
import Tile, { TileProps } from './Tile';
import { BoardData, TileSymbols } from './types';

const intialStateForBoard = () => {

    return {
        tiles: [],
        sizeX: 0,
        sizeY: 0,
        tileSize: 100,
        tilesOnHand: [],
        tilesOnTurn: []
    };
};

export interface BoardState {
    turnActive: boolean;
    activePlayer: string;
    board: BoardData;
    tileSize: number;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileProps[];
}

export interface BoardProps {
    tilesOnHand: TileSymbols[];
    activePlayer: string;
    turnActive: boolean;
    board: BoardData;
}

const Board = (props: BoardProps) => {

    const [gameData, setGameData] = React.useState<BoardState>({ ...intialStateForBoard(), ...props });

    React.useEffect(() => {

        ws.onCommand('RefreshBoard', (command) => {

            setGameData({ ...gameData, ...command.data })
        });
        // ws.sendCommand({ command: 'GetTiles' });
    }, []);

    const checkDrop = (data: TileProps) => {

        ws.sendCommand({ command: 'CheckMove', data: data });
    }

    const boardRendered = gameData.board.tiles.map((tileData, index) => <Tile key={index}
        {...tileData}
        tileSize={gameData.tileSize}
        allowDrag={false}
        onDropped={checkDrop} />)

    const tilesOnHandRendered = gameData.tilesOnHand.map((tile, index) => <Tile key={index} x={index} y={0} allowDrag={gameData.turnActive} {...tile} />);

    return <div className="vh-100 d-flex flex-column align-items-center">

        <div className="alert alert-info m-2 bg-success text-white" role="alert">
            {gameData.turnActive ? "It's your turn" : `Turn of ${gameData.activePlayer}`}
        </div>

        <div className="d-flex flex-grow-1 align-items-center" style={{ paddingBottom: "110px" }}>
            <div className="d-flex flex-wrap"
                style={{ width: `${gameData.board.sizeX * gameData.tileSize}px`, height: `${gameData.board.sizeY * gameData.tileSize}px` }}>
                {boardRendered}
            </div>
        </div>
        <div style={{ width: "600px", height: "100px", position: "fixed", bottom: "0" }} className="d-flex flex-wrap">
            {tilesOnHandRendered}
            {gameData.turnActive ? <button type="button" className="btn btn-outline-success" style={{ marginLeft: "620px" }}>
                NEXT
            </button> : undefined}
        </div>

    </div>
}

export default Board;
