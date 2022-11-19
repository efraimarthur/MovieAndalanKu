/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "64.media.tumblr.com",
      "cdn.discordapp.com",
      "media.discordapp.net",
      "imdb-api.com",
      "imdb-api.com",
    ],
  },
};

module.exports = nextConfig;
