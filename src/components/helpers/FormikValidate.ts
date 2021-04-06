const validate = (values: FormValues, type: 'signup' | 'signin') => {
    const { login, password, sex } = values
    const errors: FormErrors = {} as FormErrors
    if (login.length === 0) {
        errors.login = true
    }
    if (password.length === 0) {
        errors.password = true
    }
    if (sex?.length === 0 && type === 'signup') {
        errors.sex = true
    }
    return errors
}

export default validate