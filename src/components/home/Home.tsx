import React, { FC, useEffect, useLayoutEffect, useRef, useState, Suspense, lazy, Ref } from 'react';
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
import { ModalTypeEnum } from '../../enums/modalType'
import Header from '../context/modal/Header';
const LazyModal: any = lazy(() => import('../context/modal/Modal'));
const Modal = (LazyModal as ModalType)
Modal.Form = Form
Modal.Buttons = Buttons
Modal.Header = Header

let timer: NodeJS.Timeout | null = null

const randomColors = (() => {
    const result: string[] = []
    const colors = ['red', 'green', 'blue', 'orange']
    for (let i = 0; i < 3;) {
        const number = Math.floor(Math.random() * 4)
        if (result.indexOf(colors[number]) === -1) {
            result.push(colors[number])
            i++
        }
    }
    return result
})()

const Home: FC = () => {

    const [showSpanInfo, setShowSpanInfo] = useState(false)
    const [modalType, setModalType] = useState<ModalTypeEnum>(ModalTypeEnum.none)
    const [newUser, setNewUser] = useState(false);

    const headerRef = useRef<HTMLHeadingElement>(null)
    const modalWrapperRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>()

    const store = useSelector((store: Store) => store.userReducer)

    useLayoutEffect(() => {
        headerRef.current && createHeaderAnimation(headerRef.current, randomColors)
        return () => {
            timer && clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (modalType === ModalTypeEnum.signup && !newUser) setNewUser(true)
        else setNewUser(false)
    }, [modalType])

    const setModalBackgroundAnimationState = (state: 'running' | 'paused') => {
        modalWrapperRef.current!.style.animationPlayState = state
        if (state === 'paused') modalWrapperRef.current!.style.opacity = '1'
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
                setModalType(ModalTypeEnum.signup)
                break;
            default:
                timer = setTimeout(() => setModalBackgroundAnimationState('paused'), 300)
                setModalType(ModalTypeEnum.signin)
                break;
        }
    }

    const redirectModal = () => {
        setModalType(ModalTypeEnum.signup)
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
                                onMouseEnter={() => import('../context/modal/Modal')}
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
                    {modalType && (
                        <div className='modal-wrapper' ref={modalWrapperRef}>
                            <Modal 
                                type={modalType}
                                setBackgroundAnimationState={setModalBackgroundAnimationState}
                                toogleModal={changeModalType}
                            >
                                <Modal.Header>{modalType === 'signin' ? 'Sign In' : 'Create your new account'}</Modal.Header>
                                <Modal.Form redirectToSecondModal={redirectModal} ref={formRef as Ref<HTMLFormElement>} />
                                <Modal.Buttons handleSubimt={handleSubmit} />
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