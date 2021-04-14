import { useState } from "react";
import { createContext, FC } from "react";

interface Context {
    color: string,
    changeColor: (newColor: string) => void
}

const ColorProvider: FC = ({children}) => {

    const [color, setColor] = useState('blue')

    const changeColor = (newColor: string) => setColor(newColor)

    return(
        <ColorContext.Provider value={{color, changeColor}}>
            {children}
        </ColorContext.Provider>
    )
}

export const ColorContext = createContext<Context>({color: '', changeColor: () => null})
export default  ColorProvider