import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StockButton } from './StockButton';
import { noop } from 'lodash';
import sinon from 'sinon';

describe("<StockButton>", () => {

    it("renders a button with text", () => {

        render(<StockButton onClick={noop}>Foo Title</StockButton>);

        expect(screen.getByRole('button')).toHaveTextContent("Foo Title");
    });

    it("handle on click method", () => {

        const handleClick = sinon.spy();
        render(<StockButton onClick={handleClick}>Foo Title</StockButton>);

        fireEvent.click(screen.getByRole('button'));

        expect(handleClick).toBeCalledOnce();
    });
});