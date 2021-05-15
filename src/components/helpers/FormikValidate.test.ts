import formikValidate from './FormikValidate'

describe('Formik validate', () => {
    test('should return object with login error', () => {
        const values: FormValues = {login: '', password: 'q', keepLogIn: true}
        const res = formikValidate(values, 'signin')
        expect(res.login).toBeTruthy()
    })
    test('should return object with password error', () => {
        const values: FormValues = {login: 'q', password: '', keepLogIn: true}
        const res = formikValidate(values, 'signin')
        expect(res.password).toBeTruthy()
    })
    test('should return object with sex error', () => {
        const values: FormValues = {login: 'q', password: '', keepLogIn: true}
        const res = formikValidate(values, 'signup')
        expect(res.sex).toBeTruthy()
    })
    test('should return empty errors object(signin)', () => {
        const values: FormValues = {login: 'q', password: 'q', keepLogIn: true}
        const res = formikValidate(values, 'signin')
        expect(res).toEqual({})
    })
    test('should return empty errors object(signup)', () => {
        const values: FormValues = {login: 'q', password: 'q', keepLogIn: true, sex: 'female'}
        const res = formikValidate(values, 'signup')
        expect(res).toEqual({})
    })
})