export interface Itoken {
  name: string
  address: string
  symbol: string
  isNative?: boolean
  decimals: number
  chainId: number
  logoURI: string
}

export interface ItokenList {
  rinkeby: Itoken[]
}

const networkName = process.env.networkName as string

const AllTokenList: ItokenList = {
  rinkeby: [
    {
      name: 'Ether',
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      isNative: true,
      decimals: 18,
      chainId: 4,
      logoURI: 'https://wallet-asset.matic.network/img/tokens/eth.svg',
    },
    {
      name: 'Dai Stablecoin',
      address: '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735',
      symbol: 'DAI',
      decimals: 18,
      chainId: 4,
      logoURI: 'https://wallet-asset.matic.network/img/tokens/dai.svg',
    },
    {
      name: 'Maker',
      address: '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85',
      symbol: 'MKR',
      decimals: 18,
      chainId: 4,
      logoURI: 'https://wallet-asset.matic.network/img/tokens/dao.svg',
    },
    {
      name: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      symbol: 'UNI',
      decimals: 18,
      chainId: 4,
      logoURI: 'https://wallet-asset.matic.network/img/tokens/uni.svg',
    },
  ],
}

export const tokenList: Itoken[] = AllTokenList[networkName as keyof typeof AllTokenList]
