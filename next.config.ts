import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  // export client-side rendering static website 
  output: "export",
  // disable server-side rendering 
  ssr: false,
  images: {
    // disable image optimization 
    unoptimized: true,
    // allow external image domains 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // disable React strict mode 
  reactStrictMode: false,

  trailingSlash: true,

};

export default nextConfig;
