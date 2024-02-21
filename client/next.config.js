/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    HOST: process.env.HOST || "http://localohost:8000"
  }
};

module.exports = nextConfig;
