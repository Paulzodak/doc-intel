import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  // Allow cross-origin requests from local network IPs during development
  // This allows accessing the dev server from other devices on your network (e.g., mobile testing)
  // The IP 192.168.1.113 is your local network IP address
  allowedDevOrigins: ["192.168.1.113", "localhost", "127.0.0.1"],
};

export default nextConfig;
