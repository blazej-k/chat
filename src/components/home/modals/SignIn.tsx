import { FC, useEffect } from "react";

interface SignInProps {
    closeModal: (value: false) => void
}


const SignIn: FC<SignInProps> = ({closeModal}) => {

    useEffect(() => {
        document.addEventListener('click', (e) => {
            const {className} = e.target as Element
            if(className === 'modal-wrapper'){
                closeModal(false)
            }
        })
    }, [])

    return (
        <div className="modal-wrapper">
            <div className="modal sign-in-modal">
                <input type="text" placeholder='Login' />
                <input type="text" placeholder='Password' />
            </div>
        </div>
    );
}

export default SignIn;