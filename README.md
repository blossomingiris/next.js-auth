# XR-Auth - authentication and authorization application

## Introduction

This is a Next.js 14 project that uses NextAuth.js for simple email + password login or OAuth, Prisma as the ORM, Resend for email notification and a MongoDB database to persist the data.


## Tech stack

- [Next.js](https://nextjs.org/docs)
- [NextAuth](https://authjs.dev/getting-started/introduction)
- [Prisma](https://www.prisma.io/docs)
- [MongoDB](https://www.mongodb.com)
- [Tailwind](https://tailwindcss.com/docs/installation)
- [Shadcn](https://ui.shadcn.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Resend](https://resend.com/docs/introduction)
- [React-email](https://react.email/docs/introduction)
- [React-hook-form](https://react-hook-form.com)
- [Zod](https://zod.dev)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Urbanist, a custom Google Font.

## Enviroment variables

Setup your own eviroment variables in .env in project root directory:

```DATABASE_URL
AUTH_SECRET
AUTH_GITHUB_CLIENT_ID 
AUTH_GITHUB_CLIENT_SECRET
AUTH_GOOGLE_CLIENT
AUTH_GOOGLE_CLIENT_SECRET
RESEND_API_KEY
NEXT_PUBLIC_APP_URL
```

## Usage

### Creating a New Account
1. Users can create a new account by filling out the following fields:
- First name
- Last name
- Email
- Password
- 
All fields are required and undergo validation both on the client and server sides.

2. After creating a new account, the user will receive an email containing a verification link. Clicking on this link will take them to the email verification page.
3. Once the email is verified, the user can log in.
   
Initially, two-factor authentication (2FA) is disabled.
Users can enable it by navigating to the "./settings" page and toggling the button to 'on'.
Using External Providers
Users also have the option to create an account using their Google or Github credentials.
In this case, they won't receive a verification email or be able to set up 2FA since this is handled by Google and Github themselves.
User details will be stored in the session.
Logging In
Users can log in to the application using:
Email and password
Google or Github accounts.
Important Note
Users can create or log in to the application using either their Google or Github provider exclusively.
For security reasons, NextAuth's default behavior is to not link accounts from different providers.
Resetting Password
To reset their password, users need to:
Click on the 'Reset Password' link.
They will be directed to a page where they can enter their email address.
After that, they will receive a link in their email to create a new password.


### Further details
After successfully logging in, user can access 3 pages:
- "My Profile" page: displaying user details.
- "Administrator" page: representing in table registered users of the application (accessible if the user has an 'Administrator' role).
- "Settings" page: where user who log in using email + password can change their details:
  - name
  - password
  - email
  - user role to "Administrator" (default role is 'User')
  - activate 2FA
-  User who log in with Google or Github will have ability only to change his user role to "Administrator" (default role is 'User').

#### Logout
To log out of the application, user can simply click on his/her Avatar icon and select the "Log out" option.

## Challenges, issues, thougts

XR-Auth is experimental project. My goal was to become more familiar with Next.js and challenge myself to build a fullstack authentication app. I find some features of Next.js, like the App router, pretty intuitive and nice to use, while server actions make connecting to the database easier. Moving from React.js to Next.js made me realize the need to completely update my mindset from client components to server components, requiring more time to become familiar with consepts as SSR, ISR, caching, hydratation, etc. 

It was a challenge to use NextAuth.js, probably because of their migration to version 5, which hasn't smoothly integrated with TypeScript yet. Additionally, there were gaps in the documentation which made the learning curve steeper. As a result, I wouldn't consider it suitable for production use at this stage.

I also had my first experience working with Shadcn, a nice tailwind component library, but it can add another level of component abstraction, which might not be necessary for small apps like XR-Auth. New discovery for me was react-email small library that very useful for creating email newsletters and I am planing to use it in the future.

Some tech I've used before, like react-hook-form, zod, and framer-motion (for personal projects), are quite reliable and among my favorites to use.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Live application

Deployed apllication is [here](https://xr-auth.vercel.app).
