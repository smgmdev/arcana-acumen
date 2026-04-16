import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arcana Mace Government Services',
  description:
    'Arcana Mace + Empower is an AI-powered defence intelligence platform delivering real-time orbital threat interception, autonomous laser elimination, and ground scout operations for government and defence agencies.',
  keywords:
    'Arcana Mace, Empower, AI defence, government services, orbital defence grid, threat interception, autonomous laser, ground scout, defence intelligence, military AI, aerial threat elimination, UAE defence, orbital security, sovereign AI',
  openGraph: {
    title: 'Arcana Mace Government Services',
    description: 'AI-powered defence intelligence platform — AIR ORB MAX & Ground MAX operations.',
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
