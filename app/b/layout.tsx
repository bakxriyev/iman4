import { ReactNode } from 'react'

export const metadata = {
  title: 'MAQSAD 2026 - A',
  description: 'Iman Akhmedovnada 3 kunlik bepul onlayn dars',
  openGraph: {
    url: 'https://imanakhmedovna.uz/b',
    title: 'MAQSAD 2026 - B',
    description: '',
    type: 'website',
    images: [
      'https://static.tildacdn.one/tild3833-3037-4432-b266-613765343734/desktop_4_1.svg',
    ],
  },
}

type Props = {
  children: ReactNode
}

export default function ALayout({ children }: Props) {
  return <>{children}</>
}