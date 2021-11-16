import * as React from 'react';

export interface PlayingFieldProps {
    sizeX: number;
    sizeY: number;
    tileSize: number;
}

const PlayingField: React.FunctionComponent<PlayingFieldProps> = ({ tileSize, sizeX, sizeY, children }) => {

    return (
        <div className="d-flex flex-grow-1 align-items-center" style={{ paddingBottom: "110px" }}>
            <div className="d-flex flex-wrap"
                style={{ width: `${sizeX * tileSize}px`, height: `${sizeY * tileSize}px` }}>
                {children}
            </div>
        </div>
    );
};

export { PlayingField };
