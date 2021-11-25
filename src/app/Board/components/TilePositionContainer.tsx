import * as React from 'react';
import { TilePosition } from '../../../types';

interface TilePositionContainerProps {
    tilePosition: TilePosition;
    tileSize: number;
}

const TilePositionContainer: React.FunctionComponent<TilePositionContainerProps> = ({ children, tilePosition, tileSize }) => {

    return (
        <div style={{
            width: `${tileSize}px`, height: `${tileSize}px`,
            marginLeft: `${tilePosition.x * tileSize}px`,
            marginTop: `${tilePosition.y * tileSize}px`
        }} className={`position-absolute`}>
            {children}
        </div>
    );
};

export { TilePositionContainer };