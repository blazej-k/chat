import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Slider from './Slider'
import '../../style/Home.scss'

const Home: FC = () => {

    const colors = ['red', 'green', 'blue', 'orange']
    const [randomColors, setRandomColors] = useState<string[]>([])
    const [showInfoSpan, setShowInfoSpan] = useState(false)

    useLayoutEffect(() => {
        const result: string[] = []
        for(let i = 0; i < 3;){
            const number = Math.floor(Math.random() * 4) 
            if(result.indexOf(colors[number]) === -1){
                result.push(colors[number])
                i++
            }
        }
        setRandomColors(result)
    }, [])

    const handleButtonHover = (show: boolean) => {
        setShowInfoSpan(show)
    }

    return (
        <div className="home">
            <div className="header">
                <h1><span className={randomColors[0]}>Chat</span><span className={randomColors[1]}>Zilla</span></h1>
            </div>
            <div className="home-info"> 
                <div className="home-info-des">
                    <h2>Join to us and write to friends</h2>
                    <div className="des">
                        <p>
                            Make groups, invite friends and meet new people!
                            Create free account and join to world. Everyone're waiting for you!</p>
                        <p>
                            With ChatZilla you'll keep best relationships!
                        </p>
                    </div>
                    <button onMouseLeave={() => handleButtonHover(false)} onMouseOver={() => handleButtonHover(true)} className={randomColors[2]}>try on!</button>
                    {showInfoSpan && <span id='span-slider' className={randomColors[2]}>Are you ready?</span>}
                </div>
                <div className="home-info-slider">
                    <div className="slider-wrapper">
                        <Slider/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

