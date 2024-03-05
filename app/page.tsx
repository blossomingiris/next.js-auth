import Image from 'next/image'

import hero from '@/assets/3d-casual-life-secure-document.png'
import { routePaths } from '@/routes/routes'

import BackButton from './features/auth/components/ui/BackButton'

export default function HomePage() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="p-5 flex flex-col sm:flex-row items-center justify-center">
        <Image
          src={hero}
          alt="3d secure document"
          width={280}
          quality={95}
          className="ml-10 sm:mt-8 sm:ml-0"
        />
        <div className="space-y-6 text-center sm:text-left text-[#383838]">
          <h1 className="text-4xl sm:text-6xl font-extrabold ">XR-Auth</h1>
          <p className="text-lg sm:text-xl font-medium">
            Enhanced Authentication and Authorization
          </p>
          <BackButton
            backButtonLabel="Let's Start"
            backButtonHref={routePaths.login}
            backButtonStyle="default"
          />{' '}
        </div>
      </div>
    </main>
  )
}
