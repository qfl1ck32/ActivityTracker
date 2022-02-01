/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  env: {
    API_URL: process.env.API_URL,

    APP_URL: process.env.APP_URL,
  },
};
