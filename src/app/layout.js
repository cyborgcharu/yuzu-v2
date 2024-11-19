// src/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yuzu :: Teleprompter',
  description: 'Real-time script management',
  icons: {
    icon: '/yuzu.png',
    shortcut: '/yuzu.png',
    apple: '/yuzu.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}