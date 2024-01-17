import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { Header } from "shared/components/Header"
import { Footer } from "shared/components/Footer"
import { siteConfig } from "shared/config/site"
import { getCurrentUser } from "shared/session"
import { MainProvider } from "shared/providers"
import { ReactNode } from "react"

const dev = process.env.NODE_ENV !== "production"
if (dev) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@miickasmt"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body className={`${GeistSans.variable}`}>
        <MainProvider>
          <MainBody user={user}>{children}</MainBody>
        </MainProvider>
      </body>
    </html>
  )
}

const MainBody = ({ children, user }: { children: ReactNode; user: any }) => (
  <div className="root-container">
    <div className="content-container">
      <Header />
      <div className="pb-20">{children}</div>
    </div>
    <div className="ipad:hidden">
      <Footer user={user} />
    </div>
  </div>
)
