import { FC } from "react";


const SignIn: FC = () => {

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