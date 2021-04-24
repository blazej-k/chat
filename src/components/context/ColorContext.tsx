import { useState } from "react";
import { createContext, FC } from "react";

interface Context {
    mainColor: string,
    secondColor: string,
    changeMainColor: (newColor: string) => void
    changeSecondColor: (newColor: string) => void
}

const ColorProvider: FC = ({children}) => {

    const [mainColor, setMainColor] = useState('blue')
    const [secondColor, setSecondColor] = useState('red')

    const changeMainColor = (newColor: string) => setMainColor(newColor)

    const changeSecondColor = (newColor: string) => setSecondColor(newColor)

    return(
        <ColorContext.Provider value={{mainColor, secondColor, changeMainColor, changeSecondColor}}>
            {children}
        </ColorContext.Provider>
    )
}

export const ColorContext = createContext<Context>({
    mainColor: 'blue', 
    secondColor: 'red', 
    changeMainColor: () => null,
    changeSecondColor: () => null
})
export default  ColorProvider