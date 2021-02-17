import * as React from 'react';
// import { executeDrop, findMatchingTilesByCheckingNeighbours } from './logic/boardLogic';
import { ws } from './logic/ws';
import Tile, { TileProps } from './Tile';
import { BoardData, TileSymbols } from './types';

const intialStateForBoard = () => {

    // const initalSize = 3;
    // const retVal: TileProps[] = [];
    // for (let i = 0; i < initalSize; i++) {
    //     for (let j = 0; j < initalSize; j++) {
    //         retVal.push({
    //             x: j,
    //             y: i
    //         })
    //     }
    // }

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
    board: BoardData;
    tileSize: number;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileProps[];
}

export interface BoardProps {
    tilesOnHand: TileSymbols[];
    board: BoardData;
}

const Board = (props: BoardProps) => {

    const [gameData, setGameData] = React.useState<BoardState>({ ...intialStateForBoard(), ...props });

    React.useEffect(() => {

        ws.onCommand('RefreshBoard', (command) => {
            console.log(JSON.stringify(command.data));
            setGameData({ ...gameData, board: command.data })
        });
        // ws.sendCommand({ command: 'GetTiles' });
    }, []);

    const checkDrop = (data: TileProps) => {

        ws.sendCommand({ command: 'CheckMove', data: data });
        // const tileToChange = gameData.board.tiles.filter(item => item.x === data.x && item.y === data.y)[0];

        // const tileMatches = findMatchingTilesByCheckingNeighbours(tileToChange, data.color, data.symbol, gameData.board.tiles);
        // if (!tileMatches) {
        //     return;
        // }

        // const tilesOnTurnSize = gameData.tilesOnTurn.length;
        // if (tilesOnTurnSize === 1
        //     && tileToChange.x !== gameData.tilesOnTurn[0].x
        //     && tileToChange.y !== gameData.tilesOnTurn[0].y) {
        //     return;
        // }

        // const numberInRow = gameData.tilesOnTurn.filter(item => item.x === tileToChange.x).length;
        // const numberInCol = gameData.tilesOnTurn.filter(item => item.y === tileToChange.y).length;
        // if (tilesOnTurnSize > 1
        //     && numberInRow !== tilesOnTurnSize
        //     && numberInCol !== tilesOnTurnSize) {

        //     return;
        // }

        // gameData.tilesOnHand = gameData.tilesOnHand.filter(item => item.id !== data.id);
        // gameData.tilesOnTurn.push(tileToChange);
        // executeDrop(tileToChange, data, gameData, setGameData);
    }

    const boardRendered = gameData.board.tiles.map((tileData, index) => <Tile key={index}
        {...tileData}
        tileSize={gameData.tileSize}
        allowDrag={false}
        onDropped={checkDrop} />)

    // TODO implement random tiles for a turn
    const tilesOnHandRendered = gameData.tilesOnHand.map((tile, index) => <Tile key={index} x={index} y={0} allowDrag={true} {...tile} />);

    return <div className="vh-100 d-flex flex-column align-items-center">

        <div className="d-flex flex-grow-1 align-items-center" style={{ paddingBottom: "110px" }}>
            <div className="d-flex flex-wrap"
                style={{ width: `${gameData.board.sizeX * gameData.tileSize}px`, height: `${gameData.board.sizeY * gameData.tileSize}px` }}>
                {boardRendered}
            </div>
        </div>
        <div style={{ width: "600px", height: "100px", position: "fixed", bottom: "0" }} className="d-flex flex-wrap">
            {tilesOnHandRendered}
        </div>

    </div>
}

export default Board;
