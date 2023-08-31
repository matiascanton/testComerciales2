/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/loginuser",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
