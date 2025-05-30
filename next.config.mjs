/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com',
        },
        {
          protocol: 'https',
          hostname: 'api.lorem.space',
        },
        {
          protocol: 'https',
          hostname: 'placeimg.com',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
        },
        {
          protocol: 'https',
          hostname: 'cdn.dummyjson.com',
        },
      ],
    },
  };
  
  export default nextConfig;