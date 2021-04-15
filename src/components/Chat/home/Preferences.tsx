import * as React from 'react';
import { FC } from 'react';
import { useColor } from '../../hooks/Hooks';


const Preferences: FC = () => {

    const {changeColor} = useColor()

    return (
        <>
            <h3>Select main color: </h3>
            <div className="select-color">
                <button onClick={() => changeColor('red')} className='red'></button>
                <button onClick={() => changeColor('blue')} className='blue'></button>
                <button onClick={() => changeColor('orange')} className='orange'></button>
                <button onClick={() => changeColor('green')} className='green'></button>
                <button onClick={() => changeColor('dark')} className='dark'></button>
            </div>
        </>
    );
}

export default Preferences;