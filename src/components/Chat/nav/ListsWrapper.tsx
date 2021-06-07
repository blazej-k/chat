import { Children, FC, MouseEvent, cloneElement, isValidElement } from 'react'
import { NavList } from './Nav';

interface ListsWrapperProps {
    listsStatus: NavList<'collection-close', 'collection-open'>,
    handleListStatus: (e: MouseEvent<HTMLSpanElement>) => void,
}

const ListsWrapper: FC<ListsWrapperProps> = ({ children, listsStatus, handleListStatus }) => {
    return (
        <>
            {Children.map(children, child => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        listsStatus,
                        handleListStatus
                    })
                }
            })}
        </>
    )
}

export default ListsWrapper;