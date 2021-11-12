import * as React from 'react';

export interface DraggableProps {
    onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
    allowDrag?: boolean;
}

const Draggable: React.FunctionComponent<DraggableProps> = (props) => {

    const allowDrag = props.allowDrag && true;

    return (
        <div
            draggable={allowDrag}
            onDragOver={(event) => {
                if (props.onDragOver) {
                    props.onDragOver(event);
                }
            }}
            onDragLeave={(event) => {
                if (props.onDragLeave) {
                    props.onDragLeave(event);
                }
            }}
            onDragStart={(event) => {
                if (props.onDragStart) {
                    props.onDragStart(event);
                }
            }}
            onDrop={(event) => {
                if (props.onDrop) {
                    props.onDrop(event);
                }
            }}
        >
            {props.children}
        </div>
    );
}

export { Draggable };