import * as React from 'react';
import { FC } from 'react';
import { useColor } from '../../../hooks/Hooks';
import ColorsSection from './ColorsSection'


const Preferences: FC = () => {

    const { changeMainColor, changeSecondColor } = useColor()

    const colors = ['red', 'green', 'orange', 'blue', 'dark']

    return (
        <>
            <ColorsSection colors={colors} type={'main'} changeColor={changeMainColor}/>
            <ColorsSection colors={colors} type={'second'} changeColor={changeSecondColor}/>
        </>
    );
}

export default Preferences;