import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [{ key: "X-DNS-Prefetch-Control", value: "on" }],
    },
  ],
  experimental: {
    optimizePackageImports: ["next-themes"],
  },
};

export default withBundleAnalyzer(nextConfig);