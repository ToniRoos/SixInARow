import * as React from 'react';

interface TilePositionContainerProps {
    active: boolean;
    tileFilled?: boolean;
}

const TileStyleContainer: React.FunctionComponent<TilePositionContainerProps> = ({ children, active, tileFilled }) => {

    const bgEmptyField = active ? "bg-half-transparent" : "bg-transparent";
    const bgColor = tileFilled ? "bg-dark text-white" : bgEmptyField;

    return (
        <div className={`${bgColor} border rounded d-flex align-items-center justify-content-center h-100 w-100`}>
            {children}
        </div>
    );
};

export { TileStyleContainer };