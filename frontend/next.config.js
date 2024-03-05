/** @type {import('next').NextConfig} */
const nextConfig = {
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
