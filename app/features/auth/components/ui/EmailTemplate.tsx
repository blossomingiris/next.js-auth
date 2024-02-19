type EmailTemplate = {
  username: string
  url: string
  description: string
}

export default function EmailTemplate(props: EmailTemplate) {
  const { username, url, description } = props
  return (
    <>
      <p>Hello, {username}!</p>
      <div className="flex gap-1">
        <p>{description}</p>
        <a href={url}>Click me</a>
      </div>
      <p>XR Auth</p>
    </>
  )
}
