"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
// import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { useState } from "react"
import type { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

export function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    // <SessionProvider>
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration> */}
      {/* {<ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
    // </SessionProvider>
  )
}
