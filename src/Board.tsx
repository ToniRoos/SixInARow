import * as React from 'react';
import { executeDrop, findMatchingTilesByCheckingNeighbours } from './logic/boardLogic';
import { stock } from './logic/stock';
import Tile, { TileProps, TileSymbols } from './Tile';

const intialStateForBoard = () => {

    const initalSize = 3;
    const retVal: TileProps[] = [];
    for (let i = 0; i < initalSize; i++) {
        for (let j = 0; j < initalSize; j++) {
            retVal.push({
                x: j,
                y: i
            })
        }
    }

    return {
        tiles: retVal,
        sizeX: initalSize,
        sizeY: initalSize,
        tileSize: 100,
        tilesOnHand: stock.getNextTiles(6),
        tilesOnTurn: []
    };
};

export interface BoardProps {
    tiles: TileProps[];
    sizeX: number;
    sizeY: number;
    tileSize: number;
    tilesOnHand: TileSymbols[];
    tilesOnTurn: TileProps[];
}

const Board = () => {

    const [board, setBoard] = React.useState<BoardProps>(intialStateForBoard());

    const checkDrop = (data: TileProps) => {

        const tileToChange = board.tiles.filter(item => item.x === data.x && item.y === data.y)[0];

        const tileMatches = findMatchingTilesByCheckingNeighbours(tileToChange, data.color, data.symbol, board.tiles);
        if (!tileMatches) {
            return;
        }

        const tilesOnTurnSize = board.tilesOnTurn.length;
        if (tilesOnTurnSize === 1
            && tileToChange.x !== board.tilesOnTurn[0].x
            && tileToChange.y !== board.tilesOnTurn[0].y) {
            return;
        }

        const numberInRow = board.tilesOnTurn.filter(item => item.x === tileToChange.x).length;
        const numberInCol = board.tilesOnTurn.filter(item => item.y === tileToChange.y).length;
        if (tilesOnTurnSize > 1
            && numberInRow !== tilesOnTurnSize
            && numberInCol !== tilesOnTurnSize) {

            return;
        }

        board.tilesOnHand = board.tilesOnHand.filter(item => item.id !== data.id);
        board.tilesOnTurn.push(tileToChange);
        executeDrop(tileToChange, data, board, setBoard);
    }

    const boardRendered = board.tiles.map((tileData, index) => <Tile key={index}
        {...tileData}
        tileSize={board.tileSize}
        allowDrag={false}
        onDropped={checkDrop} />)

    // TODO implement random tiles for a turn
    const tilesOnHandRendered = board.tilesOnHand.map((tile, index) => <Tile key={index} x={index} y={0} allowDrag={true} {...tile} />);

    return <div className="vh-100 d-flex flex-column align-items-center">

        <div className="d-flex flex-grow-1 align-items-center" style={{ paddingBottom: "110px" }}>
            <div className="d-flex flex-wrap"
                style={{ width: `${board.sizeX * board.tileSize}px`, height: `${board.sizeY * board.tileSize}px` }}>
                {boardRendered}
            </div>
        </div>
        <div style={{ width: "600px", height: "100px", position: "fixed", bottom: "0" }} className="d-flex flex-wrap">
            {tilesOnHandRendered}
        </div>

    </div>
}

export default Board;
