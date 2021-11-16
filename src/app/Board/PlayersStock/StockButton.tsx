import React, { FunctionComponent } from "react";

interface StockButtonProps {
    onClick: () => void;
    leftSpace: number;
}
const StockButton: FunctionComponent<StockButtonProps> = ({ children, onClick, leftSpace }) => {

    return (
        <button type="button" className="btn btn-outline-success" style={{ marginLeft: `${leftSpace}px` }}
            onClick={onClick}>
            {children}
        </button>
    );
}

export { StockButton };