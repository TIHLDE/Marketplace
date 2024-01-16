import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import NavBar from './NavBar'
import AuthProvider from './auth/provider'
import QueryClientProvider from './QueryClientProvider';
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Providers from './providers';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#001328',
};

export const metadata: Metadata = {
  title: 'TIHLDE Marketplace',
  description: 'Laget av Mads Nylund'
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={fontSans.variable} lang="no">
      <body className='bg-white text-gray-950'>
      <QueryClientProvider>
        <AuthProvider>
          <Providers>
            <NavBar />
            <main className='max-w-screen-2xl w-full mx-auto'>
              {children}
            </main>
            <Footer />
          </Providers>
        </AuthProvider>
      </QueryClientProvider>
      <ToastContainer 
        position='bottom-right'
        autoClose={3500}
        draggable
        theme='light'
      />
      </body>
    </html>
  )
}
