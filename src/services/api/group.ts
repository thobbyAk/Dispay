import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Factory from '@/abi/Factory.json'
import GroupManagement from '@/abi/GroupManagement.json'
export async function createGroup(
  data: any
): Promise<{ result: any; error: any }> {
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
    return { result: null, error }
  }
}

export enum DepositType {
  nativeToken = '1',
  noNativeToken = '2',
}
export async function addDeposit(
  groupAddress: string,
  quantity: number,
  type: DepositType
): Promise<{ result: any; error: any }> {
  try {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    let contract = new ethers.Contract(
      groupAddress,
      GroupManagement.abi,
      signer
    )
    const amount = ethers.utils.parseUnits(quantity.toString(), 'ether')
    if (type == DepositType.nativeToken) {
      const tx = await contract.addDeposit(0, { value: amount })
      return { result: await tx.wait(), error: null }
    } else {
      await contract.approve(groupAddress, amount)
      const tx = await contract.addDeposit(amount)
      return { result: await tx.wait(), error: null }
    }
  } catch (error) {
    return { result: null, error }
  }
}

export async function getGroupByAddress(
  groupAddress: string
): Promise<{ result: any; error: any }> {
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
    return { result: null, error }
  }
}

export async function getAllGroup(): Promise<{ result: any; error: any }> {
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
    return { result, error: null }
  } catch (error) {
    return { result: null, error }
  }
}

export async function getGroupMembers(
  groupAddress: string
): Promise<{ result: any; error: any }> {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(
      `${process.env.dispayApi}/groups/${groupAddress}/members`,
      requestOptions
    )
    const result = await response.json()
    return { result, error: null }
  } catch (error) {
    return { result: null, error }
  }
}

export async function getMember(
  memberAddress: string,
  groupAddress: string
): Promise<{ result: any; error: any }> {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(
      `${process.env.dispayApi}/groups/${groupAddress}/members?address=${memberAddress}`,
      requestOptions
    )
    const result = await response.json()
    return { result, error: null }
  } catch (error) {
    return { result: null, error }
  }
}
