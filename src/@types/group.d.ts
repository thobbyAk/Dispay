interface Itoken {
  logoURI: string
  symbol: string
  symbol: string
  address: string
}

export interface IGroup {
  depositToken: string
  address: string
  symbol: string
  name: string
  owner:string
  depositLimit: number
  depositEndDate: Date
  token:Itoken | null
  maxMembers:number
  totalDeposited?:number
  totalMinted?:number
}