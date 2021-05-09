import React from 'react';
import { render } from '@testing-library/react'
import Home from './Home'
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import '@testing-library/jest-dom/extend-expect';

describe('Home', () => {
    it('should show page titile', () => {
        const { getByText } = render(<Provider store={store}><Home /></Provider>);
        expect(getByText('ChatZilla')).toBeInTheDocument()
    });
});