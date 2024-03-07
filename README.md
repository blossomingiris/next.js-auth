# XR-Auth - authentication and authorization application

## Introduction

This is a Next.js 14 project that uses Auth.js for simple email + password login or OAuth, Prisma as the ORM, Resend for email notification and a MongoDB database to persist the data.


## Tech stack

- [Next.js](https://nextjs.org/docs)
- [Auth.js](https://authjs.dev/getting-started/introduction)
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

Auth.js use JSON Web Tokens (JWT) to create session. When a user signs in, a JWT is generated and stored in an HttpOnly cookie. This cookie is protected from client-side JavaScript access, making it difficult for attackers to steal. Additionally, the JWT is encrypted with a secret key known only to the server. Even if an attacker manages to steal the JWT, they won't be able to decrypt it.


User can create new account in 2 ways:</br>

1. Credentials-based login.</br>
   
1.1 Users can create a new account by filling out the following fields:</br>
- First name
- Last name
- Email
- Password
  
All fields are required and validated both on the client and server sides.

1.2. After you create a new account, user get an email from mail@xr-auth.online with a verification link. Sometimes it might take a few minutes for the email to show up, and it could end up in spam folder.</br>

1.3. Clicking on this link will take them to the email verification page. Once the email is verified, the user can log in.

2. Using OAuth Provider (Google or Github)
   
User also have the option to create an account using their Google or Github credentials.

!Important note:
User can create or log in to the application using his/her Google or Github provider or using email + password exclusively. For security reasons, Auth.js default behavior is to not link accounts from different providers.

### Logging In
User can log in to the application in 2 ways using:
1  Email + password.
2. Google or Github accounts.

### 2FA
Initially, two-factor authentication (2FA) is disabled. Users can enable it after login and by navigating to the "Settings" page and toggling the 2FA button to 'on'. After this eveytime he/she want to login need confirm 6 digits code that was send to his email. Code lifetime is 10 minutes.
If user using Google or Githib provider he/she won't receive a verification email or be able to set up 2FA since this is handled by Google and Github themselves.

### Resetting Password
To reset password, user need to:
1. Click on the 'Forgot you password' link.
2. He/she will be directed to a page where he/she can enter their email address. 
3. After that, user will receive a link in their email to create a new password.

### Further details
After successfully logging in, user can access 3 pages:
- "My Profile" page: displaying user details.
- "Administrator" page: representing in table registered users of the application (accessible if the user has an 'Administrator' role).
- "Settings" page: where user who log in using email + password can update his/her details:
  - name
  - password
  - email
  - user role to "Administrator" (default user role is 'User')
  - activate 2FA
  - 
 !Important note: User who log in with Google or Github will have ability only to change his user role to "Administrator" (default role is 'User').

#### Logout
To log out of the application, user can simply click on his/her Avatar icon and select the "Log out" option.

## Challenges & thougts

XR-Auth is experimental project. My goal was to become more familiar with Next.js (new stack for me) and challenge myself to build a fullstack authentication app. I find some features of Next.js, like the App router, pretty intuitive and nice to use, while server actions make connecting to the database easier. Moving from React.js to Next.js made me realize the need to completely update my mindset from client components to server components, requiring more time to become familiar with consepts as CSR, SSR, ISR, caching, etc. 

It was a challenge to use Auth.js (or NextAuth), probably because of their migration to version 5, which hasn't smoothly integrated with TypeScript yet. Additionally, there were gaps in the documentation which made the learning curve steeper. As a result, I wouldn't consider it suitable for production use at this stage.

I also had my first experience working with Shadcn, a nice tailwind component library, but it can add another level of component abstraction, which might not be necessary for small apps like XR-Auth. New discovery for me was react-email - small library that very useful for creating email newsletters and I am planing to use it in the future.

Some tech I've used before, like react-hook-form, zod, and framer-motion (for personal projects), are quite reliable and among my favorites to use.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Live application

Deployed apllication is [here](https://xr-auth.vercel.app).

### Issues
1. After a user updates details in Settings page, certain changes may not immediately apply but will be reflected in the UI upon reloading the page.
2. There is issue with github login, sometimes in not allow to login to app with Error that account cant be linked if you dont tryig to login to app with another proveder. 
