import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { noop } from 'lodash';
import sinon from 'sinon';
import { Draggable } from './Draggable';

describe("<Draggable>", () => {

    it("renders with text", () => {

        render(<Draggable>Foo</Draggable>);

        expect(screen.getByText('Foo')).toHaveTextContent("Foo");
    });

    it("handle drag start", () => {

        const handleDragStart = sinon.spy();
        render(<Draggable allowDrag={true} onDragStart={handleDragStart}>Foo</Draggable>);

        fireEvent.dragStart(screen.getByText('Foo'));

        expect(handleDragStart).toBeCalledOnce();
    });

    it("handle drag over", () => {

        const handleDragOver = sinon.spy();
        render(<Draggable allowDrag={true} onDragOver={handleDragOver}>Foo</Draggable>);

        fireEvent.dragOver(screen.getByText('Foo'));

        expect(handleDragOver).toBeCalledOnce();
    });

    it("handle drag leave", () => {

        const handleDragLeave = sinon.spy();
        render(<Draggable allowDrag={true} onDragLeave={handleDragLeave}>Foo</Draggable>);

        fireEvent.dragLeave(screen.getByText('Foo'));

        expect(handleDragLeave).toBeCalledOnce();
    });

    it("handle drop", () => {

        const handleDrop = sinon.spy();
        render(<Draggable allowDrag={true} onDrop={handleDrop}>Foo</Draggable>);

        fireEvent.drop(screen.getByText('Foo'));

        expect(handleDrop).toBeCalledOnce();
    });
});