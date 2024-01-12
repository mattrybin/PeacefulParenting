// import { env } from "@/env.mjs";
// import { SiteConfig } from "types"

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  mailSupport: string
  links: {
    twitter: string
    github: string
  }
}
const site_url = "peacefulparenting.ai"

export const siteConfig: SiteConfig = {
  name: "SaaS Starter",
  description:
    "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Planetscale, Auth.js, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@saas-starter.com"
}