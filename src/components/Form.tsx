import { useFormik } from 'formik';
import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react'

interface FormProps {
    setShowChat: (show: boolean) => void
    setName: (name: string) => void
}
type sex = 'male' | 'female'
interface FormValues {
    login: string,
    password: string,
    sex: sex
}

const Form: FC<FormProps> = ({ setShowChat, setName }) => {

    const forimk = useFormik<FormValues>({
        initialValues: {
            login: '',
            password: '',
            sex: '' as sex
        },
        onSubmit: val => {
            setShowChat(true) 
            setName(val.login)
            console.log(val)
            fetch('http://localhost:1000/saveUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(val),
            })
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
                    <input type="radio" name="sex" value='male' onChange={handleChange}/>
                    Male
                </label>
                <label>
                    <input type="radio" name="sex" value='female' onChange={handleChange}/>
                    Female
                </label>
                <button type='submit'>GO!</button>
            </form>

        </div>
    );
}

export default Form;