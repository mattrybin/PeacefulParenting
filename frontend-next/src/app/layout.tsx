import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "../shared/components/Header"
import { Footer } from "../shared/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google"
          content="notranslate"
        />
        <meta
          name="twitter:widgets:csp"
          content="on"
        />
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="application-name"
          content="Airbnb"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Airbnb"
        />
        <meta
          name="theme-color"
          content="#F5F5F4"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1C1917"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="msapplication-navbutton-color"
          content="#ffffff"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="msapplication-starturl"
          content="/?utm_source=homescreen"
        />
      </head>
      <body className={inter.className}>
        <div className="root-container">
          <div className="content-container">
            <Header />
            <div className="py-4 pb-20">{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
