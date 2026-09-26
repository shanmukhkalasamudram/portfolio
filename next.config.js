/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cloudinary resizes and converts photos itself (see the loader), so the
    // site never runs images through Vercel's optimizer.
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.js",
  },
  serverExternalPackages: ["cloudinary"],
  // Local preview only: lets a phone on the same Wi-Fi load the dev server,
  // e.g. DEV_ORIGINS=192.168.1.77 in .env.local.
  allowedDevOrigins: process.env.DEV_ORIGINS ? process.env.DEV_ORIGINS.split(",") : [],
  // Don't generate AGENTS.md / CLAUDE.md files in the project.
  agentRules: false,
};

module.exports = nextConfig;
