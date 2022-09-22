/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/schools/:id/edit',
        destination: '/schools/create',
      },
    ];
  },
};

module.exports = nextConfig;
