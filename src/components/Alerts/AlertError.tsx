import { motion } from "framer-motion"
import { fadeUp } from "../../animations/animations"

type ErrorFunc = {
    error: string 
}

const AlertError: React.FC<ErrorFunc>  = ({error}) => {
  return (
    <motion.div variants={fadeUp} initial="initial" animate="enter" exit="exit" className="bg-red-300 text-black p-3 rounded-lg mb-4 w-full text-center">
        {error}
    </motion.div>
  )
}

export default AlertError