import { FC, useLayoutEffect, useRef, useState } from 'react';
import Slider from './Slider'
import '../../style/Home.scss'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"

const Home: FC = () => {

    const colors = ['red', 'green', 'blue', 'orange']
    const [randomColors, setRandomColors] = useState<string[]>([])
    const [showInfoSpan, setShowInfoSpan] = useState(false)

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
        if (ref && ref.current) {
            const { current } = ref
            const text = current.textContent?.split("") || []
            current.textContent = ''
            let i = 0
            text.forEach((element) => {
                current.innerHTML += `<span>${element}</span>`
            });
            const timer = setInterval(() => {
                current.children[i].classList.add('fade-text', i > 3 ? result[0] : result[1])
                if(i === text.length - 1){
                    clearInterval(timer)
                }
                i++
            }, 60)
        }
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

    return (
        <motion.div className="home" variants={animations} initial='out' animate='in'>
            <div className="header">
                <h1 ref={ref}>ChatZilla</h1>
            </div>
            <div className="home-info">
                <div className="home-info-des">
                    <h2>Join to us and write to friends</h2>
                    <Link to='/fsdf'>ff</Link>
                    <div className="des">
                        <p>
                            Make groups, invite friends and meet new people!
                            Create free account and join to world. Everyone're waiting for you!</p>
                        <p>
                            With ChatZilla you'll keep best relationships!
                        </p>
                    </div>
                    <button
                        onMouseLeave={() => handleButtonHover(false)}
                        onMouseOver={() => handleButtonHover(true)}
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
    );
}

export default Home;

