/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    redirectUri: process.env.REDIRECT_URI,
    tokenListUrl: process.env.TOKEN_LIST,
    dispayApi: process.env.DISPAY_API,
    botAddress: process.env.BOT_ADDRESS,
    factoryAddress: process.env.FACTORY_ADDRESS,
    networkName: process.env.NETWORK_NAME
  }
}

module.exports = nextConfig
