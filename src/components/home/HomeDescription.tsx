import React, { FC } from "react";


interface HomeDescriptionProps {
    buttonHover: (val: boolean) => void
    buttonClick: (val: 'newuser') => void,
    colors: string[],
    showSpanInfo: boolean
}


const HomeDescription: FC<HomeDescriptionProps> = ({buttonHover, buttonClick, colors, showSpanInfo}) => {
    return (
        <div className="home-info-des">
            <h2>Join to us and write to friends</h2>
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
                onMouseLeave={() => buttonHover(false)}
                onMouseOver={() => buttonHover(true)}
                onClick={() => buttonClick('newuser')}
                className={colors[2]}
            >
                try on!
            </button>
            {showSpanInfo && <span id='span-slider' className={colors[2]}>Are you ready?</span>}
        </div>
    );
}

export default HomeDescription;