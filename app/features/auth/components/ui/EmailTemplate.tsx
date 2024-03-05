import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface EmailTemplateProps {
  username: string
  url?: string
  description: string
  buttonText?: string
}

export default function EmailTemplate(props: EmailTemplateProps) {
  const { username, url, description, buttonText } = props

  return (
    <Html>
      <Head />
      <Preview>Enhanced Authentication and Authorization with XR-Auth</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {username},</Text>
          <Text style={paragraph}>{description}</Text>
          {buttonText && (
            <Section style={btnContainer}>
              <Button style={button} href={url}>
                {buttonText}
              </Button>
            </Section>
          )}
          <Text style={paragraph}>
            Best,
            <br />
            XR-Auth
          </Text>
          <Hr style={hr} />
          <Text style={footer}>123 Main Street, Athens, Greece</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'left' as const,
}

const button = {
  fontSize: '16px',
  backgroundColor: '#479eae',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '8px 16px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
