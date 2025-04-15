import type {NextConfig} from "next";

const repoName = "cgm-lab-website"; // <-- your repo name

const nextConfig: NextConfig = {
  // export client-side rendering static website 
  output: "export",
  // disable server-side rendering 
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

  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};

export default nextConfig;
