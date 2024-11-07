/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.dev.to",
      "dev-to-uploads.s3.amazonaws.com",
      "upload.wikimedia.org",
      "imgs.search.brave.com",
      "i0.wp.com"
    ]
  }
};

export default nextConfig;
