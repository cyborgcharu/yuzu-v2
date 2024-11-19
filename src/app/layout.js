// src/app/layout.js
import './globals.css'
import './fonts.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'yuzu :: teleprompter',
  description: 'Real-time script management',
  icons: {
    icon: '/favicon-16x16.png',
    shortcut: '/favicon-16x16.png',
    apple: '/favicon-16x16.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Avenir, system-ui, sans-serif' }}>{children}</body>
    </html>
  )
}