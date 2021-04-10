import * as React from 'react';
import { FC, MouseEvent } from 'react';

import { RiArrowRightSLine } from 'react-icons/ri';

interface NavProps {
    
}
 
const Nav: FC<NavProps> = () => {

    const handleLiClick = (e: MouseEvent<HTMLLIElement>) => {
        let {className} = (e.target as Element)
        if(className === 'collection-close'){
            (e.target as Element).className = 'collection-open'
        }
        else if(className === 'collection-open'){
            (e.target as Element).className = 'collection-close'
            // console.log(className)
        }
    }

    return (
        <div className="nav">
            <ul>
                <li className='collection-close' onClick={(e) => handleLiClick(e)}>
                    Friends
                    <RiArrowRightSLine/>
                </li><br/>
                <li className='collection-close' onClick={(e) => handleLiClick(e)}>
                    Groups
                    <RiArrowRightSLine/>
                </li><br/>
                <li>
                    Preferences
                </li><br/>
                <li>
                    Log out
                </li>
            </ul>
        </div>
    );
}
 
export default Nav;