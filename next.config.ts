const nextConfig = {
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
