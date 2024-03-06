# XR-Auth - advanced authefication and authorisation application

## Introduction

This is a Next.js 14 project that uses NextAuth.js for simple email + password login or OAuth, Prisma as the ORM, Resend for email notification and a MongoDB database to persist the data.


## Tech stack

- [Next.js]((https://nextjs.org/docs)
- NextAuth
- Prisma
- MongoDB
- Tailwind
- Shadcn
- Framer Motion
- Resend
- React-email
- React-hook-form
- Zod



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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Enviroment variables

Setup your own eviroment variables in .env in project root directory:

DATABASE_URL (MongodDB)
AUTH_SECRET (NextAuth)

AUTH_GITHUB_CLIENT_ID 
AUTH_GITHUB_CLIENT_SECRET

AUTH_GOOGLE_CLIENT
AUTH_GOOGLE_CLIENT_SECRET

RESEND_API_KEY

NEXT_PUBLIC_APP_URL


### Usage

### Create new account
User can create new acount to fill following field: first name, last name, email and password. All fields required and have validation on client and server side.
After user creates new can he will recieve an email with link, navigates to this link bring him to email verification page, after email will verified user can successfully login.
Intially 2FA authefication is disabled. User can enable when he navigates to "./settings' page and swithh button to 'on'

User can create account witn his Google and Github Provider
In this case userwill not recieved verification email or can't set 2FA (handles by Google and Github itself)
User details will be stored in Session 



### Login 
User can login in apllication with his email + password login or using his Google or Github accounts

Important note: User can create/login to aplication using only or Google or only Github provider, for security reason is default behaving for NextAuth to not link account for different providers.

## Reset Password 

To reset password user need click link 'Reset Password' he will be navigating to Reset password page, where he need provide his email. After he will recieve link to his email where he can creatr new password.

### Futhermore

After Sucessfull login user can see 3 pages: his profile page with his details, admin page (with registed uaers of application, if he has role 'Administrator') and Settings Page (user that login using email + password eble to change his details) user that login with Goodle or Github only his role for (Administrator or User).

## Challenges and issues

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Live 

Deployed apllication here.
