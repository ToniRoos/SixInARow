import * as React from 'react';
import { BoardData } from '../../../types';
import { getTileSize } from '../../getTileSize';
import { TileProps, BoardField } from './BoardField';

export interface PlayingFieldProps {
    board: BoardData;
    handleDrop: (data: TileProps) => void;
}

const PlayingField: React.FunctionComponent<PlayingFieldProps> = ({ board, handleDrop }) => {

    const tileSize = getTileSize();

    const boardRendered = board.tiles.map((tileData, index) => <BoardField key={index}
        {...tileData}
        tileSize={tileSize}
        allowDrag={false}
        onDropped={handleDrop} />)

    return (
        <div className="d-flex flex-grow-1 align-items-center" style={{ paddingBottom: "110px" }}>
            <div className="d-flex flex-wrap"
                style={{ width: `${board.sizeX * tileSize}px`, height: `${board.sizeY * tileSize}px` }}>
                {boardRendered}
            </div>
        </div>
    )
}

export { PlayingField };
