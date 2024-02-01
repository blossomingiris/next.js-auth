import { animation, opacity } from '@/lib/animations'
import { motion } from 'framer-motion'
import { MdReportGmailerrorred } from 'react-icons/md'

type FormErrorProps = {
  message?: string
}

export const FormError = (props: FormErrorProps) => {
  const { message } = props
  if (!message) return null

  return (
    <motion.div
      className="bg-destructive/15 p-3 rounded-md flex items-center text-sm text-destructive gap-1"
      {...animation(opacity)}
    >
      <MdReportGmailerrorred size={22} className="flex-shrink-0" />
      <p>{message}</p>
    </motion.div>
  )
}
