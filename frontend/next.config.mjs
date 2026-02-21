/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    // Strict mode helps catch bugs in development
    reactStrictMode: true,
    // Compress responses
    compress: true,
};

export default nextConfig;
