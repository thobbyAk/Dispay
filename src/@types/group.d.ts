interface Itoken {
  logoURI: string
  symbol: string
  symbol: string
  address: string
}

export interface IGroup {
  symbol: string
  name: string
  depositLimit: number
  depositEndDate: Date
  token:Itoken | null
  maxMembers:Number
  totalDeposited?:Number
  totalMinted?:Number
}

export type GroupContextType = {
  group: IGroup
  handleSetGroup: (todo: IGroup) => void
}
