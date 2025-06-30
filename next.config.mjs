/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/static/**',
      }
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      // This removes the error overlay
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ReactDevOverlayPlugin'
      );
    }
    return config;
  },
};

export default nextConfig;
