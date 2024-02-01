import { animation, opacity } from '@/lib/animations'
import { motion } from 'framer-motion'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'

type FormErrorProps = {
  message?: string
}

export const FormSuccess = (props: FormErrorProps) => {
  const { message } = props
  if (!message) return null

  return (
    <motion.div
      key="success"
      className="bg-emerald-500/15 p-3 rounded-md flex items-center text-sm text-emerald-500 gap-1"
      {...animation(opacity)}
    >
      <MdOutlineCheckCircleOutline size={22} className="flex-shrink-0" />
      <p>{message}</p>
    </motion.div>
  )
}
