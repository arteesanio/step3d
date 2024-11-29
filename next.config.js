/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIncludes: {
           './src/app/api/actions/memo/route': ['./public/fonts/**/*'],
        },
    },
}

module.exports = nextConfig
