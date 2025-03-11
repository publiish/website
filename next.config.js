/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['publiish.com'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
