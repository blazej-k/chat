import * as React from 'react';
import { FC } from 'react';
import { useColor } from '../../hooks/Hooks';


const Preferences: FC = () => {

    const {changeMainColor, changeSecondColor} = useColor()

    return (
        <>
        <div className="colors">
             <h3>Select main color: </h3>
            <div className="select-color">
                <button onClick={() => changeMainColor('red')} className='red'></button>
                <button onClick={() => changeMainColor('blue')} className='blue'></button>
                <button onClick={() => changeMainColor('orange')} className='orange'></button>
                <button onClick={() => changeMainColor('green')} className='green'></button>
                <button onClick={() => changeMainColor('dark')} className='dark'></button>
            </div>
        </div>
        <div className="colors">
        <h3>Select second color: </h3>
            <div className="select-color">
                <button onClick={() => changeSecondColor('red')} className='red'></button>
                <button onClick={() => changeSecondColor('blue')} className='blue'></button>
                <button onClick={() => changeSecondColor('orange')} className='orange'></button>
                <button onClick={() => changeSecondColor('green')} className='green'></button>
                <button onClick={() => changeSecondColor('dark')} className='dark'></button>
            </div>
        </div>
        </>
    );
}

export default Preferences;