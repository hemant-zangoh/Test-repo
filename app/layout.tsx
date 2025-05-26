import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Customer Service Dashboard',
  description: 'Customer service management interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.cdnfonts.com/css/switzer" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.cdnfonts.com/css/general-sans" 
        />
      </head>
      <body className="font-switzer">{children}</body>
    </html>
  )
}