import { color1, color2 } from '../../types';
import { title } from 'process';
import React from 'react';

interface ButtonProps {
    title: string;
    disabled: boolean;
    onClick: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({ disabled, onClick, title }) => {

    return (
        <button disabled={disabled}
            className={`btn btn-lg w-100 btn-${color1} text-${color2}`}
            onClick={(): void => onClick()}>
            {title}
        </button>
    );
}

export { Button };