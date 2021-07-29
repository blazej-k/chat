import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useColor } from '../../hooks/ContextHooks';
import Inputs from './inputs/Inputs';
import Preferences from './preferences/Preferences';

interface HomeProps {
    isNew: 'true' | 'false'
}

const Home: FC<HomeProps> = ({ isNew }) => {

    const { user: { login } } = useSelector((state: Store) => state.userReducer)

    const { mainColor } = useColor()

    return (
        <div className="chat-content">
            <div className="greeting">
                <h1 className={mainColor}>Welcome{isNew === 'false' && ' back'}, {login}</h1>
            </div>
            <div className="sections">
                <div className="section">
                    <h2>Community</h2>
                    <div className="inputs-wrapper">
                        <Inputs />
                    </div>
                </div>
                <div className="section">
                    <h2>Preferences</h2>
                    <div className="preferences-wrapper">
                        <Preferences />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;