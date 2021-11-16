import * as React from 'react';
import { TilePosition } from '../../../types';
import { useAppContext } from '../../useAppContext';

interface TilePositionContainerProps {
    active: boolean;
    tileFilled?: boolean;
    tilePosition: TilePosition;
    tileSize: number;
}

const TilePositionContainer: React.FunctionComponent<TilePositionContainerProps> = ({ children, active, tileFilled, tilePosition, tileSize }) => {

    const bgEmptyField = active ? "bg-half-transparent" : "bg-transparent";
    const bgColor = tileFilled ? "bg-dark text-white" : bgEmptyField;

    return (
        <div style={{
            width: `${tileSize}px`, height: `${tileSize}px`,
            marginLeft: `${tilePosition.x * tileSize}px`,
            marginTop: `${tilePosition.y * tileSize}px`
        }} className={`${bgColor} border position-absolute rounded d-flex align-items-center justify-content-center`}>
            {children}
        </div>
    );
};

export { TilePositionContainer };