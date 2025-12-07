/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Config for img hosts localhost, vercel and cloudinary
  images: {
    domains: ["localhost", "vercel.app", "res.cloudinary.com", "example.com"],
  },
};

export default nextConfig;
