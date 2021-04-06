import * as React from 'react';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';

export interface ModalProps {
    login: string
}

const Modal: FC<ModalProps> = ({ login }) => {

    const refs: HTMLDivElement[] = []

    useEffect(() => {
        refs.forEach(ref => {
            ref.addEventListener('click', (e) => setActiveToClickedDiv(e))
        })
        return () => {
            refs.forEach(ref => {
                ref.removeEventListener('click', (e) => setActiveToClickedDiv(e))
            })
        }
    }, [])

    const setActiveToClickedDiv = (e: globalThis.MouseEvent) => {
        refs.forEach(ref => {
            if(ref.children[0].className === 'circle active'){
                ref.children[0].className = 'circle'
            }
        })
        const target = (e.target as Element)
        target.children[0].classList.add('active')
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
                   <div className="nav">
                       <div className="circle-wrapper" ref={el => el && refs.push(el)}>
                           <div className="circle active"></div>
                       </div>
                       <div className="circle-wrapper" ref={el => el && refs.push(el)}>
                           <div className="circle"></div>
                       </div>
                       <div className="circle-wrapper"  ref={el => el && refs.push(el)}>
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