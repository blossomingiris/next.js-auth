import React from 'react'

type EmailTemplate = {
  firstName: string
  confirmationLink: string
}

export default function EmailTemplate(props: EmailTemplate) {
  const { firstName, confirmationLink } = props
  return (
    <div>
      <h1>Hello, {firstName}</h1>
      <p>Verify your email address by clicking </p>
      <a href={confirmationLink}>here</a>
    </div>
  )
}
