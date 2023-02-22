const {
  createVanillaExtractPlugin,
} = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: 'https://re-taro.dev',
        basePath: false,
        permanent: false,
      },
    ]
  },
}

module.exports = withVanillaExtract(config)
