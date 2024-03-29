import { useEffect, useState } from 'react'

type Password = {
  criteria: string
  isValid: boolean
}

const usePasswordValidation = () => {
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [validationCriteria, setValidationCriteria] = useState<Password[]>([])

  const passwordComplexity = [
    { criteria: 'One lowercase letter', regex: /[a-z]/ },
    { criteria: 'One uppercase letter', regex: /[A-Z]/ },
    { criteria: 'One number', regex: /\d/ },
    { criteria: 'One special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
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
