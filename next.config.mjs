/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.microcms-assets.io', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/service/development',
        destination: '/service/ai-solution',
        permanent: true,
      },
      {
        source: '/service/ai-training',
        destination: '/service/ai-solution',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
