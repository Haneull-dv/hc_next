/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  disable: process.env.NODE_ENV !== 'production',
  buildExcludes: [/middleware-manifest\.json$/]
})

const nextConfig = {}

module.exports = withPWA(nextConfig)
