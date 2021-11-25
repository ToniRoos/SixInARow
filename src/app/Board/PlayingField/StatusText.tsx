import * as React from 'react';
import './StatusText.scss';
interface StatusTextProps {
    statusText: string;
}

const StatusText: React.FunctionComponent<StatusTextProps> = ({ statusText }) => {
    return <div className="alert alert-info m-2 bg-success text-white position-fixed status-text" role="alert">
        {statusText}
    </div>;
}

export { StatusText };