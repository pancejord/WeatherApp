/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackage: ['@tremor/react'],
    }
}

module.exports = nextConfig
