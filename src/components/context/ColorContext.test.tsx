import React, { FC } from 'react'
import { useColor } from '../hooks/ContextHooks'
import {fireEvent, screen} from '@testing-library/react'
import renderWithColorProvider from 'test-utils/renderWithColorProvider'
import Nav from '../chat/nav/Nav'

const TestedComponent: FC<{newMainColor?: string, newSecondColor?: string}> = ({newMainColor = '', newSecondColor = ''}) => {
    const { mainColor, secondColor, changeMainColor, changeSecondColor } = useColor()
    return (
        <>
            <div data-testid='main' className={mainColor} />
            <div data-testid='second' className={secondColor} />
            <button onClick={() => changeMainColor(newMainColor)}>Change main</button>
            <button onClick={() => changeSecondColor(newSecondColor)}>Change second</button>
        </>
    )
}

//in my app the className attribute determines style

describe('ColorContext', () => {
    test('children should have specific classNames(colors)', () => {
        renderWithColorProvider(<TestedComponent/>)
        expect(screen.queryByTestId('main')?.className).toEqual('blue')
        expect(screen.queryByTestId('second')?.className).toEqual('red')
    })
    test('children should changed classNames(colors)', () => {
        renderWithColorProvider(<TestedComponent newMainColor='orange' newSecondColor='green'/>)
        const button1 = screen.getByRole('button', {name: 'Change main'})
        const button2 = screen.getByRole('button', {name: 'Change second'})
        fireEvent.click(button1)
        fireEvent.click(button2)
        expect(screen.queryByTestId('main')?.className).toEqual('orange')
        expect(screen.queryByTestId('second')?.className).toEqual('green')
    })
    test('should show custom component with specific classNames(colors)', () => {
        renderWithColorProvider(<Nav />)
        const nav = screen.getByTestId('nav')
        const userLogin = screen.getByRole('heading')
        expect(userLogin.className).toEqual('blue')
        expect(nav.className).toEqual('nav-wrapper blue')
    })
})
