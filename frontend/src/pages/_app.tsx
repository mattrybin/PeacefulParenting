import { Header } from "shared/components/Header"
import "../shared/styles/globals.css"
import type { AppProps } from "next/app"
import { Footer } from "shared/components/Footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <>
      <div className="root-container">
        <div className="content-container">
          <Header />
          <div className="pb-20">
            <Component {...pageProps} />
          </div>
        </div>
        <div className="ipad:hidden">
          <Footer user={true} />
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

// const MainBody = ({ children, user }: { children: ReactNode; user: any }) => (
//   <div className="root-container">
//     <div className="content-container">
//       <Header />
//       <div className="pb-20">{children}</div>
//     </div>
//     <div className="ipad:hidden">
//       <Footer user={user} />
//     </div>
//   </div>
// )
