/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'tihldestorage.blob.core.windows.net'
          },
        ],
      },
}

module.exports = nextConfig
