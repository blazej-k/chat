import * as React from 'react';
import { FC } from 'react';


const Preferences: FC = () => {
    return (
        <>
            <h3>Select main color: </h3>
            <div className="select-color">
                <button className='red'></button>
                <button className='blue'></button>
                <button className='orange'></button>
                <button className='green'></button>
            </div>
        </>
    );
}

export default Preferences;