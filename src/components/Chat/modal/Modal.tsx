import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import ModalSlideDes from './ModalSlideDes';
import '../../../style/modals/Modals.scss'


interface ModalProps {
    login: string,
    showModal: (value: false) => void
}

const Circle: FC<{ refs: HTMLDivElement[], index: number, slideIndex: number }> = ({ refs, index, slideIndex }) => (
    <div className="circle-wrapper" id={`circle${index}`} ref={el => el && refs.push(el)}>
        <div className={`circle ${slideIndex === index ? 'active' : ''}`}></div>
    </div>
)

const Modal: FC<ModalProps> = ({ login, showModal }) => {

    const [slideIndex, setSlideIndex] = useState(0)

    const navRef = useRef<HTMLDivElement>(null)
    const slideRef = useRef<HTMLDivElement>(null)

    const refs: HTMLDivElement[] = []

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
                <div className="modal-welcome" data-testid='greeting-modal'>
                    <h1>Welcome {login}!</h1>
                    <div className="slide" ref={slideRef}>
                        <div className="description">
                            <ModalSlideDes index={slideIndex} />
                        </div>
                    </div>
                    <div className="nav" ref={navRef}>
                        <Circle refs={refs} index={0} slideIndex={slideIndex}/>
                        <Circle refs={refs} index={1} slideIndex={slideIndex}/>
                        <Circle refs={refs} index={2} slideIndex={slideIndex}/>
                    </div>
                    <div className="buttons-wrapper">
                        <div className="buttons">
                            {slideIndex < 2 ?
                                <>
                                    <button className='orange' onClick={() => showModal(false)} type='button'>skip</button>
                                    <button className='blue' onClick={changeModalSlide} type='button'>next</button>
                                </> :
                                <button className='blue' type='button' onClick={() => showModal(false)}>finish</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;