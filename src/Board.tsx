import * as React from 'react';
import { ws } from './logic/ws';
import Tile, { TileProps } from './Tile';
import { BoardData, TileSymbols } from './types';

// const intialStateForBoard = () => {

//     return {
//         board: {
//             tiles: [],
//             sizeX: 0,
//             sizeY: 0,
//             activePlayer: ""
//         },
//         tileSize: 100,
//         tilesOnHand: [],
//         tilesOnTurn: []
//     };
// };

export interface BoardState {
    turnActive: boolean;
    board: BoardData;
    // tileSize: number;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileProps[];
}

// export interface BoardProps {
//     tilesOnHand: TileSymbols[];
//     activePlayer: string;
//     turnActive: boolean;
//     board: BoardData;
// }

const Board = (props: BoardState) => {

    const [gameData, setGameData] = React.useState<BoardState>({ ...props });
    const [tileSize, setTileSize] = React.useState<number>(100);

    React.useEffect(() => {

        ws.onCommand('RefreshBoard', (command) => {

            setGameData(() => { return { ...gameData, ...command.data } })
        });
        // ws.sendCommand({ command: 'GetTiles' });
    }, []);

    const checkDrop = (data: TileProps) => {

        ws.sendCommand({ command: 'CheckMove', data: data });
    }

    const boardRendered = gameData.board.tiles.map((tileData, index) => <Tile key={index}
        {...tileData}
        tileSize={tileSize}
        allowDrag={false}
        onDropped={checkDrop} />)

    const tilesOnHandRendered = gameData.tilesOnHand.map((tile, index) => <Tile key={index} x={index} y={0} allowDrag={gameData.turnActive} {...tile} />);

    return <div className="vh-100 d-flex flex-column align-items-center">

        <div className="alert alert-info m-2 bg-success text-white position-fixed" style={{ zIndex: 999 }} role="alert">
            {gameData.turnActive ? "It's your turn" : `Turn of ${gameData.board.activePlayer}`}
        </div>

        <div className="d-flex flex-grow-1 align-items-center" style={{ paddingBottom: "110px" }}>
            <div className="d-flex flex-wrap"
                style={{ width: `${gameData.board.sizeX * tileSize}px`, height: `${gameData.board.sizeY * tileSize}px` }}>
                {boardRendered}
            </div>
        </div>
        <div style={{ width: `${tileSize * tilesOnHandRendered.length}px`, height: `${tileSize}px`, position: "fixed", bottom: "0" }} className="d-flex flex-wrap">
            {tilesOnHandRendered}
            {gameData.turnActive ? <button type="button" className="btn btn-outline-success" style={{ marginLeft: `${(tileSize * tilesOnHandRendered.length) + 20}px` }}
                onClick={() => {
                    ws.sendCommand({ command: 'NextTurn' })
                }}>
                NEXT
            </button> : undefined}
        </div>

    </div>
}

export default Board;
