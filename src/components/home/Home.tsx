import { FC, useLayoutEffect, useRef, useState } from 'react';
import Slider from './Slider'
import '../../style/Home.scss'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import HeaderAnimation from '../helpers/HeaderAnimation';
import Modal from './Modal'

const Home: FC = () => {

    const colors = ['red', 'green', 'blue', 'orange']
    const [randomColors, setRandomColors] = useState<string[]>([])
    const [showInfoSpan, setShowInfoSpan] = useState(false)
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    const ref = useRef<HTMLHeadingElement>(null)

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

    const handleButtonHover = (show: boolean) => {
        setShowInfoSpan(show)
    }

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
                    <div className="home-info-des">
                        <h2>Join to us and write to friends</h2>
                        <Link to='/fsdf'>ff</Link>
                        <div className="des">
                            <p>
                                Make groups, invite friends and meet new people!
                                Create free account and join to world. Everyone're waiting for you!
                            </p>
                            <p>
                                With ChatZilla you'll keep best relationships!
                            </p>
                        </div>
                        <button
                            onMouseLeave={() => handleButtonHover(false)}
                            onMouseOver={() => handleButtonHover(true)}
                            onClick={() => handleButtonClick('newuser')}
                            className={randomColors[2]}
                        >
                            try on!
                    </button>
                        {showInfoSpan && <span id='span-slider' className={randomColors[2]}>Are you ready?</span>}
                    </div>
                    <div className="home-info-slider">
                        <div className="slider-wrapper">
                            <Slider />
                        </div>
                    </div>
                </div>
            </motion.div>
            {(showSignInModal || showSignUpModal) &&
                <div className='modal'>
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

