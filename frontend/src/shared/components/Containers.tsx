import { PropsWithChildren } from "react"

export const PageContainer = ({ children }: PropsWithChildren) => (
  <div className="grid grid-flow-row">{children}</div>
)
