import { color1, color2 } from '../../types';
import * as React from 'react';

const LoginModal: React.FunctionComponent = ({ children }) => {

    return (
        <div className={`bg-${color2} p-5 shadow-lg rounded border border-${color1}`}>
            {children}
        </div>
    );
}

export { LoginModal };