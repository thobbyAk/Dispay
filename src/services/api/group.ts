import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Factory from '@/abi/Factory.json'

export async function createGroup(data: any): Promise<any> {
  try {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const factoryAddress: string = process.env.factoryAddress || ''
    const contract = new ethers.Contract(factoryAddress, Factory.abi, signer)
    const tx = await contract.createGroup(...data)
    const receipt = await tx.wait()
    const result = receipt.events?.filter(
      (group: any) => group.event == 'NewGroup'
    )
    return { result, error: null }
  } catch (error) {
    return { resul: null, error }
  }
}

export async function getGroup(groupAddress: string): Promise<any> {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(
      `${process.env.dispayApi}/groups/${groupAddress}`,
      requestOptions
    )
    const result = await response.json()
    return { result, error: null }
  } catch (error) {
    return { resul: null, error }
  }
}

export async function getAllGroup(): Promise<any> {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(
      `${process.env.dispayApi}/groups`,
      requestOptions
    )
    const result = await response.json()
    console.log(result)
    return { result, error: null }
  } catch (error) {
    return { resul: null, error }
  }
}
