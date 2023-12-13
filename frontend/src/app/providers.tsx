"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { useState } from "react"
import type { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
          }
        }
      })
  )

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
        {/* {<ReactQueryDevtools initialIsOpen={false} />} */}
      </QueryClientProvider>
    </SessionProvider>
  )
}
