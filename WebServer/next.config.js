/** @type {import('next').NextConfig} */
const nextConfig = {

    // output: 'standalone',
    webpack: {
        resolve: {
            fallback: {
                net: false
            }
        }
    }
    
}

module.exports = nextConfig
