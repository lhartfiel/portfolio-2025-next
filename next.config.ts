import type { NextConfig } from "next";

const IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_PATH ||
  "https://lhartfiel.pythonanywhere.com/media/uploads/" ||
  "https://lindsayhartfiel.com/media/uploads/";
const url = new URL(IMAGE_URL as string);

const nextConfig: NextConfig = {
  images: {
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
