import React, { FC, useEffect, useLayoutEffect, useRef, useState, Suspense, lazy } from 'react';
import { motion } from "framer-motion"
import createHeaderAnimation from '../helpers/HeaderAnimation';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Footer from '../footer/Footer';
import animations from '../helpers/animationConfig'
import HomeDescription from './HomeDescription'
import Slider from './Slider';
import '../../style/home/Home.scss';
import Form from '../context/modal/Form';
import Buttons from '../context/modal/Buttons';
import { ModalType } from '../context/modal/Modal';
const LazyModal: any = lazy(() => import('../context/modal/Modal'));
const Modal = (LazyModal as ModalType)
Modal.Form = Form
Modal.Buttons = Buttons

let timer: NodeJS.Timeout | null = null
const colors = ['red', 'green', 'blue', 'orange']
const Home: FC = () => {

    const [randomColors, setRandomColors] = useState<string[]>([])
    const [showSpanInfo, setShowSpanInfo] = useState(false)
    const [modalType, setModalType] = useState<'signin' | 'signup' | null>(null)
    const [newUser, setNewUser] = useState(false);

    const headerRef = useRef<HTMLHeadingElement>(null)
    const modalWrapperRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>()

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

    useEffect(() => {
        if (modalType === 'signup' && !newUser) setNewUser(true)
        else setNewUser(false)
    }, [modalType])

    const setModalBackgroundAnimationState = (state: 'running' | 'paused') => {
        modalWrapperRef.current!.style.animationPlayState = state
        if(state === 'paused') modalWrapperRef.current!.style.opacity = '1'
    }

    const handleButtonHover = (show: boolean) => setShowSpanInfo(show)

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
                timer = setTimeout(() => setModalBackgroundAnimationState('paused'), 300)
                setModalType('signup')
                break;
            default:
                timer = setTimeout(() => setModalBackgroundAnimationState('paused'), 300)
                setModalType('signin')
                break;
        }
    }

    const redirectModal = () => {
        setModalType('signup')
        timer = setTimeout(() => setModalBackgroundAnimationState('paused'), 300)
    }

    const changeModalType = (newModalType: typeof modalType) => setModalType(newModalType)

    const handleSubmit = () => {
        formRef.current?.dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true })
        )
    }

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
                            <button 
                                className={randomColors[0]} 
                                id='sign-in' 
                                onClick={() => handleButtonClick('signin')}
                                onMouseEnter={() => import('./Modal')}
                            >
                                Sign In
                            </button>
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
                    {modalType  && (
                        <div className='modal-wrapper' ref={modalWrapperRef}>
                                <Modal 
                                    type={modalType}
                                    headerContent={modalType === 'signin' ? 'Sign In' : 'Create your new account'}
                                    setBackgroundAnimationState={setModalBackgroundAnimationState}
                                    toogleModal={changeModalType}
                                >
                                    <Modal.Form redirectToSecondModal={redirectModal} ref={formRef as React.Ref<HTMLFormElement>}/> 
                                    <Modal.Buttons handleSubimt={handleSubmit}/>
                                </Modal>
                        </div>
                    )}
                </Suspense>
            </div>
            <Footer />
        </>
    );
}

export default Home;