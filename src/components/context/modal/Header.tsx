import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const Header: FC = ({ children }) => {

    const [userAuthError, setUserAuthError] = useState('')

    const store = useSelector((store: Store) => store.userReducer)

    useEffect(() => {
        if (store.error && store.error !== userAuthError) {
            setUserAuthError(store.error)
        }
    }, [store])

    return (
        <>
            <h1>{children}</h1>
            {userAuthError && <span className="user-auth-error">{userAuthError}</span>}
        </>
    );
}

export default Header;