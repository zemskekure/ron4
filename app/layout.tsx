import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

const newParis = localFont({
  src: [
    {
      path: '../public/fonts/NewParisText-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NewParisText-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/NewParisText-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-new-paris',
})

export const metadata: Metadata = {
  title: 'Ron McKinlay v Čestru — 26. 3. 2026',
  description:
    'Vícechodové degustační menu z českých surovin očima kanadského šéfkuchaře. Jednorázový pop-up v Praze, 130 večeří.',
}

export const viewport: Viewport = {
  themeColor: '#f4f0e8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZXYNZJX8K0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZXYNZJX8K0');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${newParis.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
