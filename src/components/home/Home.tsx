import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Slider from './Slider'
import '../../style/Home.scss'
import { motion } from "framer-motion"
import HeaderAnimation from '../helpers/HeaderAnimation';
import Modal from './Modal'
import HomeDescription from './HomeDescription';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const Home: FC = () => {

    const colors = ['red', 'green', 'blue', 'orange']

    const [randomColors, setRandomColors] = useState<string[]>([])
    const [showSpanInfo, setShowSpanInfo] = useState(false)
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [newUser, setNewUser] = useState(false)

    const ref = useRef<HTMLHeadingElement>(null)

    const store = useSelector((store: Store) => store.userReducer)

    useLayoutEffect(() => {
        const result: string[] = []
        for (let i = 0; i < 3;) {
            const number = Math.floor(Math.random() * 4)
            if (result.indexOf(colors[number]) === -1) {
                result.push(colors[number])
                i++
            }
        }
        setRandomColors(result)
        if (ref && ref.current) HeaderAnimation(ref.current, result)
    }, [])

    useEffect(() => {
        if(showSignUpModal && !newUser){
            setNewUser(true)
        }
        else if(!showSignUpModal && newUser){
            setNewUser(false)
        }
    }, [showSignUpModal])

    const animations = {
        in: {
            opacity: 1,
            transition: { duration: 1 },
        },
        out: {
            opacity: 0,
            transition: { duration: 1 },
        }
    }

    const handleButtonHover = (show: boolean) => {
        setShowSpanInfo(show)
    }

    const handleButtonClick = (type: 'support' | 'work' | 'signin' | 'newuser') => {
        switch (type) {
            case 'support':
                //to do
                console.log('support clicked')
                break;
            case 'work':
                //to do
                console.log('work clicked')
                break;
            case 'newuser':
                setShowSignUpModal(true)
                break;
            default:
                setShowSignInModal(true)
                break;
        }
    }

    const redirectModal = () => {
        setShowSignInModal(false)
        setShowSignUpModal(true)
    }

    return (
        <div className="home-wrapper">
            {store.user.login && <Redirect to={`/chat/${newUser}`}/>} 
            <motion.div className="home" variants={animations} initial='out' animate='in'>
                <div className="header">
                    <h1 ref={ref}>ChatZilla</h1>
                    <div className="actions">
                        <button className={randomColors[1]} onClick={() => handleButtonClick('support')}>Support</button>
                        <button className={randomColors[2]} onClick={() => handleButtonClick('work')}>Work with us</button>
                        <button className={randomColors[0]} onClick={() => handleButtonClick('signin')}>Sign In</button>
                    </div>
                </div>
                <div className="home-info">
                    <HomeDescription 
                        buttonClick={handleButtonClick}
                        buttonHover={handleButtonHover}
                        colors={randomColors}
                        showSpanInfo={showSpanInfo}    
                    />
                    <div className="home-info-slider">
                        <Slider />
                    </div>
                </div>
            </motion.div>
            {(showSignInModal || showSignUpModal) &&
                <div className='modal-full-screen'>
                    {showSignInModal ? <Modal 
                        isModalOpen={setShowSignInModal} 
                        redirectModal={redirectModal} 
                        type='signin'
                    /> : 
                    <Modal 
                        isModalOpen={setShowSignUpModal} 
                        type='signup'
                    />}
                </div>
            }
        </div>
    );
}

export default Home;

