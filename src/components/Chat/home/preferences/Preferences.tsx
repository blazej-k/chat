import * as React from 'react';
import { FC } from 'react';
import { useColor } from '../../../hooks/ContextHooks';
import ColorsSection from './ColorsSection'


const Preferences: FC = () => {

    const { changeMainColor, changeSecondColor } = useColor()

    const colors = ['red', 'green', 'orange', 'blue', 'dark']

    return (
        <>
            <div className="main-color-wrapper">
                <ColorsSection colors={colors} type={'main'} changeColor={changeMainColor} />
            </div>
            <div className="second-color-wrapper">
                <ColorsSection colors={colors} type={'second'} changeColor={changeSecondColor} />
            </div>
        </>
    );
}

export default Preferences;