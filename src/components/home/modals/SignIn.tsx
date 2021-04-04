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
                <label>
                    Login:
                    <input type="text" />
                </label><br />
                <label>
                    Password:
                    <input type="password" />
                </label>
                <div className="buttons-wrapper">
                    <div className="buttons">
                        <button>cancel</button>
                        <button>ready</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;