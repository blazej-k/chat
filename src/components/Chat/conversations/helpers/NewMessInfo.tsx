import React, { FC } from 'react'
import { useColor } from '../../../hooks/Hooks';

interface NewMessInfoProps {
    show: boolean,
    from: string,
    text: string
}

export const initNewMessInfo: NewMessInfoProps = {
    show: false,
    from: '',
    text: ''
}

const NewMessInfo: FC<NewMessInfoProps> = ({ show, from, text }) => {

    const { secondColor } = useColor()

    return (
        <>
            {show && <div className={`${secondColor} new-mess-info`}>
                <span>{from}</span>
                <span>{text}</span>
            </div>}
        </>
    );
}

export default NewMessInfo;