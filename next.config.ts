
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source:
          "/area/:region/:district/:service(kitchen-hood|island-hood|chimney-hood)",
        destination: "/area/:region/:district",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
