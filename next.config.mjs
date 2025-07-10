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
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/static/**",
      },
    ],
  },
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      // Silences warnings in console
      config.resolve.alias["react-dom$"] = "react-dom/profiling";
    }
    return config;
  },
};

export default nextConfig;
