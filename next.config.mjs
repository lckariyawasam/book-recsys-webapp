/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['books.google.com'],
    },
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/fastapi',
          destination: 'http://127.0.0.1:8000',
        },
      ]
    },
  }

export default nextConfig;
