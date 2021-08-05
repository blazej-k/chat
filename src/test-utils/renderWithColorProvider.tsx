import { render } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import ColorProvider from '../components/context/ColorContext'
import { getStore } from './customStore'

const renderWithColorProvider = (ui: ReactElement) => render(
    <Provider store={getStore()}>
        <ColorProvider>
            {ui}
        </ColorProvider>
    </Provider>
)

export default renderWithColorProvider