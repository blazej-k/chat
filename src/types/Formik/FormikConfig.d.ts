interface FormValues {
    login: string,
    password: string,
    sex?: Sex,
    keepLogIn: boolean
}

interface FormErrors {
    login: boolean,
    password: boolean,
    sex: boolean,
}
