import { ModalTypeEnum } from '../../enums/modalType'
import formikValidate from './FormikValidate'

describe('Formik validate', () => {
    test('should return object with login error', () => {
        const values: FormValues = {login: '', password: 'q', keepLogIn: true}
        const res = formikValidate(values, ModalTypeEnum.signin)
        expect(res.login).toMatchSnapshot()
    })
    test('should return object with password error', () => {
        const values: FormValues = {login: 'q', password: '', keepLogIn: true}
        const res = formikValidate(values, ModalTypeEnum.signin)
        expect(res.password).toMatchSnapshot()
    })
    test('should return object with sex error', () => {
        const values: FormValues = {login: 'q', password: '', keepLogIn: true}
        const res = formikValidate(values, ModalTypeEnum.signup)
        expect(res.sex).toMatchSnapshot()
    })
    test('should return empty errors object(signin)', () => {
        const values: FormValues = {login: 'q', password: 'q', keepLogIn: true}
        const res = formikValidate(values, ModalTypeEnum.signin)
        expect(res).toEqual({}) 
    }) 
    test('should return empty errors object(signup)', () => {
        const values: FormValues = {login: 'q', password: 'q', keepLogIn: true, sex: 'female'}
        const res = formikValidate(values, ModalTypeEnum.signup)
        expect(res).toEqual({})
    })
})