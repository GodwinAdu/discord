import { ClerkProvider } from '@clerk/nextjs'
import '../../globals.css'
 
export const metadata = {
  title: 'Next.js 13 with Clerk',
}
 
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <ClerkProvider>
      <html lang="en">
        <body 
          className='h-screen flex items-center justify-center'
        >
          {children}
        </body>
      </html>
    // </ClerkProvider>
  )
}