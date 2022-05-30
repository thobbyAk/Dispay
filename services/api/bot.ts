import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { FactoryAddress } from '../../config'
import Factory from '../../abi/Factory.json'

const baseUrl = process.env.dispayApi

interface createBot {
  groupAddress: string
}
export async function createBot(
  data: createBot
): Promise<{ result: any; error: any }> {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
    const result = await fetch(`${baseUrl}/bot`, requestOptions)

    return { result: await result.json(), error: null }
  } catch (error) {
    return { result: null, error }
  }
}
