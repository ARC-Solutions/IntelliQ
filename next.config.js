/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.intelliq.dev', 'lh3.googleusercontent.com'],
    },
};

// eslint-disable-next-line unicorn/prefer-module
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
// eslint-disable-next-line unicorn/prefer-module
module.exports = withBundleAnalyzer(nextConfig);
