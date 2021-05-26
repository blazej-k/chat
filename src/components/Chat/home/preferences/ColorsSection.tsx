import * as React from 'react';
import { FC } from 'react';
import { useColor } from '../../../hooks/ContextHooks';
import ColorButton from './ColorButtons'

interface ColorsSectionProps {
    changeColor: (color: string) => void,
    colors: string[],
    type: 'main' | 'second'
}


const ColorsSection: FC<ColorsSectionProps> = ({changeColor, colors, type}) => {

    const {mainColor, secondColor} = useColor()
    const setExludedColor = () => {
        if(type === 'main'){
            return mainColor
        }
        else{
            return secondColor
        }
    }

    return (
        <>
            <div className="colors">
                <h3>Select {type} color: </h3>
                <div className="select-color">
                    {colors.map(color => setExludedColor() !== color && <ColorButton key={color} color={color} changeColor={changeColor}/>)}
                </div>
            </div>
        </>
    );
}

export default ColorsSection