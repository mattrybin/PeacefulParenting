"use client"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "../shared/components/Header"
import { Footer } from "../shared/components/Footer"
import { PropsWithChildren } from "react"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== "undefined") {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
    }
  }
  return (
    <html
      lang="en"
      data-theme={typeof window !== "undefined" ? localStorage.theme : "auto"}
    >
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
        <Providers>
          <Body>{children}</Body>
        </Providers>
      </body>
    </html>
  )
}

const Body = ({ children }: PropsWithChildren) => (
  <div className="root-container">
    <div className="content-container">
      <Header />
      <div className="pb-20">{children}</div>
    </div>
    <div className="ipad:hidden">
      <Footer />
    </div>
  </div>
)
