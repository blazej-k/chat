import { useFormik } from 'formik';
import { FC } from 'react'
import useSocket from './hooks/SocketHook';


type sex = 'male' | 'female'

interface FormValues {
    login: string,
    password: string,
    sex: sex
}

interface FormProps {
    setName: (name: string) => void
}

const Form: FC<FormProps> = ({setName}) => {

    const client = useSocket().client

    const forimk = useFormik<FormValues>({
        initialValues: {
            login: '',
            password: '',
            sex: '' as sex
        },
        onSubmit: (val, {resetForm}) => {
            setName(val.login)
            // fetch('http://localhost:1000/saveUser', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(val),
            // })
            client.emit('add user to listeners', val.login)
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
                <label>
                    <input type="radio" name="sex" value='male' onChange={handleChange} checked={sex === "male"}/>
                    Male
                </label>
                <label>
                    <input type="radio" name="sex" value='female' onChange={handleChange} checked={sex === "female"}/>
                    Female
                </label>
                <button type='submit'>GO!</button>
            </form>

        </div>
    );
}

export default Form;