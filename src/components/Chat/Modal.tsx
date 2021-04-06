import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';

export interface ModalProps {
    login: string
}

const Modal: FC<ModalProps> = ({ login }) => {

    const [slideIndex, setSlideIndex] = useState(0)

    const navRef = useRef<HTMLDivElement>(null)

    const refs: HTMLDivElement[] = []
    const slides = [
        <div>Slide 1</div>,
        <div>Slide 2</div>,
        <div>Slide 3</div>
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

    const changeModalSlide = (e: globalThis.MouseEvent) => {
        const target = (e.target as Element)
        console.log(slideIndex)
        if (target.id) {
            refs.forEach(ref => {
                if (ref.children[0].className === 'circle active') {
                    ref.children[0].className = 'circle'
                }
            })
            target.children[0].classList.add('active')

            if (navRef && navRef.current) {
                const { children } = navRef.current
                for (let i = 0; i < children.length; i++) {
                    if (children[i].id === target.id) {
                        if (i > slideIndex) {
                            target.classList.add('animation-to-left')
                        }
                        else {
                            target.classList.add('animation-to-right')
                        }
                        navRef.current.children[slideIndex].className = 'circle-wrapper'
                        setSlideIndex(i)
                    }
                }
            }
        }
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
                    {slides[slideIndex]}
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
                            <button className='orange' type='button'>skip</button>
                            <button className='blue' type='button'>next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;