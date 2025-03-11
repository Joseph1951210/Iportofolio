import './globals.css'
import { Suspense } from 'react'
import LayoutProvider from './layoutProvider'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><LayoutProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </LayoutProvider></body>
    </html>
  )
}
