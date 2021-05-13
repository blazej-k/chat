import { Variants } from "framer-motion"

const animations: Variants = {
    in: {
        opacity: 1,
        transition: { duration: 0.6 },
    },
    out: {
        opacity: 0,
        transition: { duration: 0.6 },
    }
}

export default animations