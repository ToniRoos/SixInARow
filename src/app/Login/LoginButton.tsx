import { color1, color2 } from '../../types';
import * as React from 'react';

interface LoginButtonProps {
    disabled: boolean;
    onClick: () => void;
}

const LoginButton: React.FunctionComponent<LoginButtonProps> = ({ disabled, onClick }) => {

    return (
        <button disabled={disabled} className={`btn btn-lg w-100 btn-${color1} text-${color2}`}
            onClick={(): void => onClick()}>
            Join Game
        </button>
    );
}

export { LoginButton };