import * as React from 'react';
import { TileData } from '../../../types';

interface TilePositionContainerProps {
    active: boolean;
    tileFilled?: boolean;
    position: TileData;
}

const TilePositionContainer: React.FunctionComponent<TilePositionContainerProps> = ({ children, active, tileFilled, position }) => {

    const tileSize = 100;

    const bgEmptyField = active ? "bg-half-transparent" : "bg-transparent";
    const bgColor = tileFilled ? "bg-dark text-white" : bgEmptyField;

    return (
        <div style={{
            width: `${tileSize}px`, height: `${tileSize}px`,
            marginLeft: `${position.x * tileSize}px`,
            marginTop: `${position.y * tileSize}px`
        }} className={`${bgColor} border position-absolute rounded d-flex align-items-center justify-content-center`}>
            {children}
        </div>
    );
};

export { TilePositionContainer };