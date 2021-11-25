import React, { FunctionComponent } from "react";

interface StockButtonProps {
    onClick: () => void;
}
const StockButton: FunctionComponent<StockButtonProps> = ({ children, onClick }) => {

    return (
        <button type="button" className="btn btn-outline-success"
            onClick={onClick}>
            {children}
        </button>
    );
}

export { StockButton };