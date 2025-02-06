import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === 'production' ? "https" : "http",
        hostname: `${process.env.WORDPRESS_HOSTNAME}`,
        port: `${process.env.WORDPRESS_PORT}`,
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: `${process.env.WORDPRESS_URL}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
