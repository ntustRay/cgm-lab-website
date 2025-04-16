import type {NextConfig} from "next";

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

  /**
   * The basePath and assetPrefix are used to serve the app from a subdirectory.
   * 
   * With the current configuration of "/cgm-lab-website":
   * - The app will be accessible at: https://cgm.cs.ntust.edu.tw/cgm-lab-website
   * - All assets will be prefixed with "/cgm-lab-website"
   * 
   * Example: If you want to deploy to a different path (e.g., "/newversion"),
   * simply update both basePath and assetPrefix to that value.
   */

  basePath: "/cgm-lab-website",
  assetPrefix: "/cgm-lab-website",
};

export default nextConfig;