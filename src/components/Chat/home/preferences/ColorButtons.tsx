import React, { FC } from 'react'


interface ColorsButtonProps {
    changeColor: (color: string) => void,
    color: string
}
 
const ColorButton: FC<ColorsButtonProps> = ({changeColor, color}) => {
    return (
        <button onClick={() => changeColor(color)} className={color}></button>
    );
}
 
export default ColorButton;