import GoogleProvider from "next-auth/providers/google"
import { env } from "../env.mjs";
import { NextAuthOptions } from "next-auth";
// import PostgresAdapter from "@auth/pg-adapter"
// import { Pool } from 'pg'

// const pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: "/login",
  },
}

// export const { auth, handlers: { GET, POST } } = NextAuth({
//   // adapter: PostgresAdapter(pool),
//   providers: [
//     GoogleProvider({
//       clientId: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET
//     })
//   ],
  // // callbacks: {
  // //   async redirect({ url, baseUrl }) {
  // //     return "/"
  // //   },
  // // },
  // secret: env.NEXTAUTH_SECRET
// })