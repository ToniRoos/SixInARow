import React, { Fragment } from 'react';
import { TileData } from '../../../types';
import { PlayingFieldTile, TileProps } from './PlayingFieldTile';

interface PlayingFieldListProps {
    tileSize: number;
    onDropped?: (props: TileProps) => void;
    tiles: TileData[];
}

const PlayingFieldList: React.FunctionComponent<PlayingFieldListProps> = ({ tileSize, onDropped, tiles }) => {

    const boardRendered = tiles.map((tileData, index) => <PlayingFieldTile key={index}
        position={tileData.position}
        symbol={tileData.symbol}
        tileSize={tileSize}
        onDropped={onDropped} />)

    return (
        <Fragment>
            {boardRendered}
        </Fragment>
    );
};

export { PlayingFieldList };
