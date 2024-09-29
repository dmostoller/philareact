/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.dev.to',
      'dev-to-uploads.s3.amazonaws.com',
      'upload.wikimedia.org',
      'imgs.search.brave.com',
      'i0.wp.com',
    ],
  },
  webpack: (config) => {
    return config;
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
  server: {
    hostname: '0.0.0.0',
    port: 3000,
  },
};

export default nextConfig;
