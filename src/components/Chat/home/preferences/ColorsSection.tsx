import * as React from 'react';
import { FC } from 'react';
import ColorButton from './ColorButtons'

interface ColorsSectionProps {
    changeColor: (color: string) => void,
    colors: string[]
}


const ColorsSection: FC<ColorsSectionProps> = ({changeColor, colors}) => {

    return (
        <>
            <div className="colors">
                <h3>Select main color: </h3>
                <div className="select-color">
                    {colors.map(color => <ColorButton color={color} changeColor={changeColor}/>)}
                </div>
            </div>
        </>
    );
}

export default ColorsSection