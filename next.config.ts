import type { NextConfig } from "next";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_PATH;
const DOMAIN_PATH = process.env.NEXT_SERVER_PATH;
const url = new URL(IMAGE_URL as string);

const nextConfig: NextConfig = {
  images: {
    domains: [`${DOMAIN_PATH}`],
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: "/media/uploads/**",
      },
    ],
  },
};

export default nextConfig;
