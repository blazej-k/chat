import { useFormik } from 'formik'
import React, { FC } from 'react'
import Loader from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { userAuth } from '../../../actions/UserActions'
import validate from '../../helpers/FormikValidate'
import { useModal } from '../../hooks/ContextHooks'


export interface FormProps {
    redirectToSecondModal: () => void
}

const Form: FC<FormProps> = ({ redirectToSecondModal }) => {

    const store = useSelector((store: Store) => store.userReducer)
    const dispatch = useDispatch()

    const { type, setModalAnimationState, setBackgroundAnimationState } = useModal()

    const formik = useFormik<FormValues>({
        initialValues: {
            login: '',
            password: '',
            sex: '' as Sex,
            keepLogIn: false,
        },
        validate: values => validate(values, type),
        onSubmit: values => {
            if (type === 'signin') {
                delete values.sex
            }
            const form: UserAuthInfo = values
            dispatch(userAuth(form))
        }
    })

    const redirectModal = () => {
        setModalAnimationState('running')
        setBackgroundAnimationState('running')
        setTimeout(() => {
            redirectToSecondModal()
            setModalAnimationState('paused')
            setBackgroundAnimationState('paused')
        }, 300)
    }

    const { handleSubmit, handleChange, values: { login, password }, errors } = formik

    return (
        <form onSubmit={handleSubmit} data-testid='modal-form'>
            <input
                type="text"
                name='login'
                placeholder='Username'
                id='login'
                value={login}
                onChange={handleChange}
            />
            {errors.login && <span className='form-validate'>Required</span>}
            <br />
            <input
                type="password"
                name='password'
                id='password'
                placeholder='Password'
                value={password}
                onChange={handleChange}
            />
            {errors.password && <span className='form-validate'>Required</span>}
            <br />
            {type === 'signup' &&
                <div className="sex">
                    <label>Male
                        <input
                            type="radio"
                            name="sex"
                            value='male'
                            onChange={handleChange}
                        />
                    </label>
                    <label>Female
                        <input
                            type="radio"
                            name="sex"
                            value='female'
                            onChange={handleChange}
                        />
                    </label>
                    {errors.sex && <span className='form-validate-sex'>Required</span>}
                </div>
            }
            <input
                type="checkbox"
                name="keepLogIn"
                onChange={handleChange}
            />
            <label htmlFor="keep-login">Keep me log in</label><br />
            {type === 'signin' && <span className='redirect' onClick={redirectModal}>Create new acount!</span>}
            {store.loading && <div className="loader" data-testid={'loader'}>
                <Loader type='Watch' color='black' width='40px' />
            </div>}
        </form>
    );
}

export default Form;