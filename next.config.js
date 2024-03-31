/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mlsmdldhgoiptgnhjlod.supabase.co",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
