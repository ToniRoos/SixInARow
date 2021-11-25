import React, { FunctionComponent } from "react";
import { color1 } from "../../types";

const FullScreenContainer: FunctionComponent = ({ children }) => {
    return (
        <div className={`vh-100 d-flex flex-column align-items-center justify-content-center bg-${color1}`}>
            {children}
        </div>
    );
};

export { FullScreenContainer };