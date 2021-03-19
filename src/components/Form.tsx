import { useFormik } from 'formik';
import { FC } from 'react'
import useSocket from './hooks/SocketHook';
import { useDispatch } from 'react-redux'
import { signUp } from '../actions/UserActions';

type sex = 'male' | 'female'

interface FormValues {
    login: string,
    password: string,
    sex?: sex
}

interface FormProps {
    showChat: (show: boolean) => void,
    formType: 'signIn' | 'signUp'
}

const Form: FC<FormProps> = ({ showChat, formType }) => {

    const client = useSocket().client
    const dispatch = useDispatch()

    const forimk = useFormik<FormValues>({
        initialValues: {
            login: '',
            password: '',
            sex: '' as sex
        },
        onSubmit: (val, { resetForm }) => {
            if(formType === 'signIn'){
                delete val.sex
            }
            client.emit('add user to listeners', val.login)
            showChat(true)
            dispatch(signUp(val))
            resetForm()
        }
    })

    const { handleSubmit, handleChange, values: { login, password, sex } } = forimk

    return (
        <div className="form">
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name='login' value={login} onChange={handleChange} />
                <input type="password" name='password' value={password} onChange={handleChange} />
                {formType === 'signUp' && <>
                    <label>
                        <input type="radio" name="sex" value='male' onChange={handleChange} checked={sex === "male"} />
                    Male
                </label>
                    <label>
                        <input type="radio" name="sex" value='female' onChange={handleChange} checked={sex === "female"} />
                    Female
                </label>
                </>
                }
                <button type='submit'>GO!</button>
            </form>

        </div>
    );
}

export default Form;
