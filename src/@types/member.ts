export interface IUser {
  address: string
}

export interface IMember {
  share: number
  totalDeposited: number
  totalMinted: number
  user: IUser
}
