import { useState } from 'react'
import { useEffect } from 'react'

type Password = {
  criteria: string
  isValid: boolean
}

const usePasswordValidation = () => {
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [validationCriteria, setValidationCriteria] = useState<Password[]>([])

  const passwordComplexity = [
    { criteria: 'one lowercase letter', regex: /[a-z]/ },
    { criteria: 'one uppercase letter', regex: /[A-Z]/ },
    { criteria: 'one number', regex: /\d/ },
    { criteria: 'one special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
    { criteria: '8 characters long', regex: /.{8,}/ },
  ]

  useEffect(() => {
    const validatePassword = () => {
      const newValidationCriteria = passwordComplexity.map(rule => {
        return {
          criteria: rule.criteria,
          isValid: rule.regex.test(password),
        }
      })

      const newPasswordIsValid = newValidationCriteria.every(
        rule => rule.isValid,
      )
      setValidationCriteria(newValidationCriteria)
      setIsValid(newPasswordIsValid)
    }

    if (password) {
      validatePassword()
    } else {
      setValidationCriteria([])
      setIsValid(false)
    }
  }, [password])

  const handlePasswordValidationChange = (newPassword: string) => {
    setPassword(newPassword)
  }

  return {
    password,
    isValid,
    validationCriteria,
    handlePasswordValidationChange,
  }
}

export default usePasswordValidation
