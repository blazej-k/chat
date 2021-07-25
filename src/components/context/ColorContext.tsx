import React, { createContext, FC, useMemo, useState } from "react";

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

    const contextProps = useMemo(() => (
        {mainColor, secondColor, changeMainColor, changeSecondColor}
    ), [mainColor, secondColor])

    return(
        <ColorContext.Provider value={{...contextProps}}>
            {children}
        </ColorContext.Provider>
    )
}

ColorProvider.displayName = 'ColorProvider'

export const ColorContext = createContext<Context>({
    mainColor: 'blue', 
    secondColor: 'red', 
    changeMainColor: () => null,
    changeSecondColor: () => null
})
export default ColorProvider