import { Variants } from 'framer-motion'

export const animation = (variants: Variants) => {
  return {
    initial: 'initial',
    whileInView: 'onscreen',
    exit: 'exit',
    variants,
  }
}

export const opacity = {
  initial: { opacity: 0, scale: 0.9 },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
  exit: { opacity: 0 },
}

export const validation = {
  initial: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: { type: 'easy-in' },
  },
  exit: { opacity: 0 },
}


