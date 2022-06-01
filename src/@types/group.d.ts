interface Itoken {
  logoURI: string
  symbol: string
  symbol: string
  address: string
}

export interface IGroup {
  address: string
  symbol: string
  name: string
  depositLimit: number
  depositEndDate: Date
  token:Itoken | null
  maxMembers:number
  totalDeposited?:number
  totalMinted?:number
}

export type GroupContextType = {
  group: IGroup
  handleSetGroup: (todo: IGroup) => void
}
