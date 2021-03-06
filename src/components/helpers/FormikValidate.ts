import { ModalTypeEnum } from "../../enums/modalType"

const validate = (values: FormValues, type: ModalTypeEnum) => {
    const { login, password, sex } = values
    const errors: FormErrors = {} as FormErrors
    if (login.length === 0) {
        errors.login = true
    }
    if (password.length === 0) {
        errors.password = true
    }
    if (!sex && type === ModalTypeEnum.signup) {
        errors.sex = true
    }
    return errors
}

export default validate