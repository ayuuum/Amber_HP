/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
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
        source: '/work',
        destination: '/cases',
        permanent: true,
      },
      {
        source: '/work/:path*',
        destination: '/cases/:path*',
        permanent: true,
      },
      {
        source: '/industries',
        destination: '/#industries',
        permanent: true,
      },
      {
        source: '/insights',
        destination: '/blog',
        permanent: true,
      },
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
      {
        source: '/service/development/blog',
        destination: '/blog?category=development',
        permanent: true,
      },
      {
        source: '/service/ai-training/blog',
        destination: '/blog?category=training',
        permanent: true,
      },
      {
        source: '/service/development/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/service/ai-training/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/blog/jirei-hearing-irai',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/service/development/blog/jirei-hearing-irai',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
