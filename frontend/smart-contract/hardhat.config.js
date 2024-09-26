require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");
require('hardhat-deploy');

require("dotenv").config();

module.exports = {
  networks: {
    kovan: {
      url: `https://eth-kovan.alchemyapi.io/v2/${process.env.KOVAN_ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/mOQhwgzIpWaKz0kp-g5Kuj6FQP3l-evl`,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  namedAccounts: {
    deployer: 0
  }

}