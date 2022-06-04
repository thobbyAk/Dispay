import React, { useEffect, useState } from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material'
import { getGroupMembers } from '@/services/api/group'
import { IMember } from '@/types/member'
import { IGroup } from '@/types/group'
import { tokenList, Itoken } from '@/services/utils/tokenList'
import { ethers } from 'ethers'
import { shortenAddress } from '@/services/utils/util'

interface IMemberList {
  group: IGroup
}
function MemberList({ group }: IMemberList) {
  const [members, setMembers] = React.useState([])
  const depositToken: Itoken = tokenList.filter(
    (token) => token.address === group?.depositToken
  )[0]

  React.useEffect(() => {
    handleFetchCollectible()
  }, [])

  async function handleFetchCollectible() {
    const { result } = await getGroupMembers(group.address)
    if (result) setMembers(result)
  }
  return (
    <>
      {members.length ? (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Member</TableCell>
                  <TableCell align="right">Deposit amount</TableCell>
                  <TableCell align="right">Club tokens (ownership share)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member: IMember) => (
                  <TableRow
                    key={member.user.address}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {shortenAddress(member.user.address)} 
                    </TableCell>

                    <TableCell align="right">
                      {ethers.utils.formatEther(member?.totalDeposited || 0)} {depositToken?.symbol}
                    </TableCell>
                    <TableCell align="right">{ethers.utils.formatEther(member?.totalMinted || 0)} {group.symbol} ({member.share}%)</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{ color: 'white', textAlign: 'left' }}
          >
            No members
          </Typography>
        </>
      )}
    </>
  )
}

export default MemberList
