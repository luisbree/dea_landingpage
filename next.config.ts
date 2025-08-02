import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // OpenLayers uses some modules that don't play nice with server-side rendering.
    // This will replace them with a mock on the server.
    if (isServer) {
      config.resolve.alias['ol/interaction'] = false;
    }
    return config;
  },
};

export default nextConfig;
