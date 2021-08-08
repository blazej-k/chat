import React, { FC, useEffect, useLayoutEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from "framer-motion"
import createHeaderAnimation from '../helpers/HeaderAnimation';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Footer from '../footer/Footer';
import animations from '../helpers/animationConfig'
import HomeDescription from './HomeDescription'
import Slider from './Slider';
import '../../style/home/Home.scss';
const Modal = lazy(() => import('./Modal'))

let timer: NodeJS.Timeout | null = null

const Home: FC = () => {

    const colors = ['red', 'green', 'blue', 'orange']

    const [randomColors, setRandomColors] = useState<string[]>([])
    const [showSpanInfo, setShowSpanInfo] = useState(false)
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [newUser, setNewUser] = useState(false)

    const headerRef = useRef<HTMLHeadingElement>(null)
    const modalWrapperRef = useRef<HTMLDivElement>(null)

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
        headerRef.current && createHeaderAnimation(headerRef.current, result)
        return () => {
            timer && clearTimeout(timer)
        }
    }, [])

    const setModalBackgroundAnimationState = (state: 'running' | 'paused') => {
        modalWrapperRef.current!.style.animationPlayState = state
    }

    useEffect(() => {
        if (showSignUpModal && !newUser) {
            setNewUser(true)
        }
        else if (!showSignUpModal && newUser) {
            setNewUser(false)
        }
    }, [showSignUpModal])

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
                timer = setTimeout(() => setModalBackgroundAnimationState('paused'), 310)
                setShowSignUpModal(true)
                break;
            default:
                timer = setTimeout(() => setModalBackgroundAnimationState('paused'), 310)
                setShowSignInModal(true)
                break;
        }
    }

    const redirectModal = () => {
        setShowSignInModal(false)
        setShowSignUpModal(true)
        timer = setTimeout(() => setModalBackgroundAnimationState('paused'), 310)
    }

    const handleDispalyFirstModal = (dispaly: boolean) => setShowSignInModal(dispaly)
    const handleDispalySecondModal = (dispaly: boolean) => setShowSignUpModal(dispaly)

    return (
        <>
            <div className="home-wrapper">
                {store.user.login && <Redirect to={`/chat/${newUser}`} />}
                <motion.div className="home" variants={animations} initial='out' animate='in'>
                    <div className="header">
                        <h1 ref={headerRef}>ChatZilla</h1>
                        <div className="actions">
                            <button className={randomColors[1]} onClick={() => handleButtonClick('support')}>Support</button>
                            <button className={randomColors[2]} onClick={() => handleButtonClick('work')}>Work with us</button>
                            <button className={randomColors[0]} id='sign-in' onClick={() => handleButtonClick('signin')}>Sign In</button>
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
                <Suspense fallback={null}>
                    {(showSignInModal || showSignUpModal) &&
                        <div className='modal-wrapper' ref={modalWrapperRef}>
                            {showSignInModal ? <Modal
                                toogleModal={handleDispalyFirstModal}
                                redirectModal={redirectModal}
                                setBackgroundAnimationState={setModalBackgroundAnimationState}
                                type='signin'
                            /> :
                                <Modal
                                    toogleModal={handleDispalySecondModal}
                                    setBackgroundAnimationState={setModalBackgroundAnimationState}
                                    type='signup'
                                />}
                        </div>
                    }
                </Suspense>
            </div>
            <Footer />
        </>
    );
}

export default Home;