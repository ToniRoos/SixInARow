import * as React from 'react';

interface StatusTextProps {
    statusText: string;
}

const StatusText: React.FunctionComponent<StatusTextProps> = ({ statusText }) => {
    return <div className="alert alert-info m-2 bg-success text-white position-fixed" style={{ zIndex: 999 }} role="alert">
        {statusText}
    </div>;
}

export { StatusText };