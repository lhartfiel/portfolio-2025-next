import type { NextConfig } from "next";
import * as path from "path";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_PATH;
const DOMAIN_PATH = process.env.NEXT_SERVER_PATH;
let url: URL | undefined;
if (IMAGE_URL) {
  url = new URL(IMAGE_URL);
}

const nextConfig: NextConfig = {
  images: {
    domains: DOMAIN_PATH ? [DOMAIN_PATH] : [],
    remotePatterns: url
      ? [
          {
            protocol: url.protocol.replace(":", "") as "http" | "https",
            hostname: url.hostname,
            port: url.port || undefined,
            pathname: "/media/uploads/**",
          },
        ]
      : [],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default nextConfig;
