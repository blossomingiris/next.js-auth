import { motion } from 'framer-motion'
import { LuCheck, LuX } from 'react-icons/lu'

import { animation, opacity } from '@/lib/animations'
import { cn } from '@/lib/utils'

type Password = {
  criteria: string
  isValid: boolean
}

type PasswordCriteriaListProps = {
  validationCriteria: Password[]
}

export default function PasswordCriteriaList(props: PasswordCriteriaListProps) {
  const { validationCriteria } = props
  return (
    <motion.div className="mt-2 w-full" {...animation(opacity)}>
      <p className="text-sm mb-2">Create password with following criteria:</p>
      <ul className="grid grid-cols-1 gap-y-1 custom:grid-cols-2 lg:grid-cols-3 whitespace-nowrap rounded-lg bg-muted p-2">
        {validationCriteria.map(({ criteria, isValid }, index) => (
          <li
            key={index}
            className={cn(
              'flex gap-[2px] text-sm items-center text-muted-foreground',
              { 'text-foreground font-medium': isValid },
            )}
          >
            {isValid ? (
              <LuCheck className="text-emerald-500" />
            ) : (
              <LuX className="text-destructive" />
            )}
            {criteria}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
