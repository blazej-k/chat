import * as React from 'react';
import { FC, useEffect, useRef, useState, MouseEvent } from 'react';

interface ModalProps {
    login: string
}

const Modal: FC<ModalProps> = ({ login }) => {

    const [slideIndex, setSlideIndex] = useState(0)

    const navRef = useRef<HTMLDivElement>(null)
    const slideRef = useRef<HTMLDivElement>(null)

    const refs: HTMLDivElement[] = []
    const slides = [
        <div>Slide 1</div>,
        <div>Slide 2</div>,
        <div>Slide 3</div>,
    ]

    useEffect(() => {
        refs.forEach(ref => {
            ref.addEventListener('click', changeModalSlide)
        })
        return () => {
            refs.forEach(ref => {
                ref.removeEventListener('click', changeModalSlide)
            }) 
        }
    }, [slideIndex])

    const changeModalSlide = (e: globalThis.MouseEvent | MouseEvent<HTMLButtonElement>) => {
        const target = (e.target as Element)
        const slideElement = (slideRef.current as HTMLDivElement)
        if (target.tagName.toLowerCase() === 'button') {
            refs.forEach(ref => {
                if (ref.firstElementChild?.className === 'circle active') {
                    ref.children[0].className = 'circle'
                }
            })
            if (slideIndex + 1 > 2) {
                setSlideIndex(0)
                navRef.current?.firstElementChild?.firstElementChild?.classList.add('active')
            }
            else {
                setSlideIndex(prev => prev + 1)
                navRef.current?.children[slideIndex + 1].firstElementChild?.classList.add('active')
            }
            slideElement.className = '';
            slideElement.classList.add('slide', 'slide-to-left')
            setTimeout(() => {
                slideElement.className = 'slide'
            }, 400)
        }
        if (target.id) {
            refs.forEach((ref, index) => {
                if (ref.firstElementChild?.className === 'circle active') {
                    ref.children[0].className = 'circle'
                }
                if (ref === target) {
                    setSlideIndex(index)
                    slideElement.className = ''
                    index < slideIndex ? slideElement.classList.add('slide', 'slide-to-right') :
                        slideElement.classList.add('slide', 'slide-to-left')
                    setTimeout(() => {
                        slideElement.className = 'slide'
                    }, 400)
                }
            })
        }
        target.firstElementChild?.classList.add('active')
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-box">
                <div className="modal-welcome">
                    <h1>Welcome {login}!</h1>
                    <div className="description">
                        We're very happy that you've joined to our community! Follow the rules and
                        write with our friends. Here's some good advice to you. If you want you can skip this tutorial.
                    </div>
                    <div className="slide" ref={slideRef}>
                        {slides[slideIndex]}
                    </div>
                    <div className="nav" ref={navRef}>
                        <div className="circle-wrapper" id='circle1' ref={el => el && refs.push(el)}>
                            <div className="circle active"></div>
                        </div>
                        <div className="circle-wrapper" id='circle2' ref={el => el && refs.push(el)}>
                            <div className="circle"></div>
                        </div>
                        <div className="circle-wrapper" id='circle3' ref={el => el && refs.push(el)}>
                            <div className="circle"></div>
                        </div>
                    </div>
                    <div className="buttons-wrapper">
                        <div className="buttons">
                            {slideIndex < 2 ?
                                <>
                                    <button className='orange' type='button'>skip</button>
                                    <button className='blue' onClick={changeModalSlide} type='button'>next</button>
                                </> :
                                <button className='blue' type='button'>finish</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;