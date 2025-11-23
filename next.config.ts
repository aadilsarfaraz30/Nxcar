import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["api.nxcar.in","nxcar-images.s3.ap-south-1.amazonaws.com","prod-nxcar-listing.s3.ap-south-1.amazonaws.com","placehold.co"],
  }
  /* config options here */
};

export default nextConfig;
