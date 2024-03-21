/** @type {import('next').NextConfig} */
const nextConfig = {
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
