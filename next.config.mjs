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
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  // Optimize preloading and reduce warnings
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Reduce preload warnings by optimizing resource loading
  poweredByHeader: false,
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      // Silences warnings in console
      // config.resolve.alias["react-dom$"] = "react-dom/profiling";
    }
    return config;
  },
};

export default nextConfig;
