import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { env } from "../env.mjs";
// import PostgresAdapter from "@auth/pg-adapter"
// import { Pool } from 'pg'

// const pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })

export const { auth, handlers: { GET, POST } } = NextAuth({
  // adapter: PostgresAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     return "/"
  //   },
  // },
  secret: env.NEXTAUTH_SECRET
})