import React, { FC } from 'react';


interface ModalSlideDesProps {
    index: number
}

const modalDescription = [
    <p className='description'>
        We're very happy that you've joined to our community! Follow the rules and write with our friends.
        Here's some good advice to you. If you want you can skip this tutorial.
    </p>,
    <div className="regulations">
        <h3>Regulations</h3>
        <ul>
            <li>Don't be vulgar</li>
            <li>Don't spam</li>
            <li>Be smile</li>
            <li>Make sure you are happy!</li>
        </ul>
    </div>,
    <div className="about-nav">
        <div className="description">
            If you want you can change page theme in the preferences. In left side of the page you can also find 
            your friends and groups.
        </div>
    </div>
]
 
const ModalSlideDes: FC<ModalSlideDesProps> = ({index}) => {
    return (
        <div className="modal-description">
            {modalDescription[index]}
        </div>
    );
}
 
export default ModalSlideDes;