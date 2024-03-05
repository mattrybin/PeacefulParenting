import { PropsWithChildren, ReactNode } from "react"
import "../shared/styles/globals.css"
import { Header } from "shared/components/Header"

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <MainBody>{children}</MainBody>
      </body>
    </html>
  )
}
const MainBody = ({ children }: { children: ReactNode }) => (
  <div className="root-container">
    <div className="content-container">
      <Header />
      <div className="pb-20">{children}</div>
    </div>
    <div className="ipad:hidden">{/* <Footer user={user} /> */}</div>
  </div>
)
