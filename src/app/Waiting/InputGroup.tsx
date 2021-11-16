import { FunctionComponent } from "react";
import React from 'react';
import { color1, color2 } from "../../types";

interface InputGroupProps {
    label: string;
    value: string;
}

const InputGroup: FunctionComponent<InputGroupProps> = ({ label, value }) => {

    const key = label.trim();

    return (
        <div key={key} className="input-group mb-3">
            <span className={`input-group-text bg-transparent border-0 text-${color1}`} id={`inputPlayer${key}`} >{label}</span>
            <input type="text" aria-describedby={`inputPlayer${key}`} disabled className={`form-control form-control-lg bg-${color1} text-${color2}`} value={value} />
        </div>
    );
};

export { InputGroup };