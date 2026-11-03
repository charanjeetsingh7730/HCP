/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  reactStrictMode: true,
  // When building on Vercel, run full serverless build with dynamic API routes.
  // When building locally for Hostinger, generate static export for dist folder.
  ...(isVercel ? {} : { output: 'export', trailingSlash: true }),
  images: {
    unoptimized: true
  }
};

export default nextConfig;

