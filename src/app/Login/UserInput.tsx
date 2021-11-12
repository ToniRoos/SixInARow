import { color1, color2 } from '../../types';
import * as React from 'react';

interface UserInputProps {
    onInput: (text: string) => void;
}

const UserInput: React.FunctionComponent<UserInputProps> = ({ onInput }) => {

    return (
        <div className="mb-3">
            <label htmlFor="inputName" className={`form-label text-${color1}`}>Enter a name</label>
            <input type="text"
                className={`form-control form-control-lg bg-${color1} text-${color2}`} id="inputName"
                onChange={(e) => onInput(e.target.value)} />
        </div>
    );
}

export { UserInput };