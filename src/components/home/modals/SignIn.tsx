import { FC, useEffect } from "react";

interface SignInProps {
    closeModal: (value: false) => void
}


const SignIn: FC<SignInProps> = ({ closeModal }) => {

    useEffect(() => {
        document.addEventListener('click', (e) => {
            const { className } = e.target as Element
            if (className === 'modal-wrapper') {
                closeModal(false)
            }
        })
    }, [])

    return (
        <div className="modal-wrapper">
            <div className="modal sign-in-modal">
                <h1>Sign In</h1>
                    <input type="text" placeholder='Username'/><br/>
                    <input type="password" placeholder='Password'/><br/>
                    <input type="checkbox" name="keep-login" id="keepl-login"/>Keep me log in
                <div className="buttons-wrapper">
                    <div className="buttons">
                        <button onClick={() => closeModal(false)}>cancel</button>
                        <button>ready</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;