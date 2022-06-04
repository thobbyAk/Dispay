import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Paper } from '@mui/material'
import Avatar from 'boring-avatars'
import { IGroup } from '@/types/group'
import { IMember } from '@/types/member'

import { ethers } from 'ethers'
import { tokenList, Itoken } from '@/services/utils/tokenList'
import { getMember } from '@/services/api/group'
import useLocalStorage from 'src/hooks/localStorage'

interface IMemberDetails {
  group: IGroup
}
function MemberDetails({ group }: IMemberDetails) {
  const [userAddress] = useLocalStorage<string>('account', '')

  const [member, setMember] = React.useState<IMember>()

  const depositToken: Itoken = tokenList.filter(
    (token) => token.address === group?.depositToken
  )[0]

  React.useEffect(() => {
    handleFetchCollectible()
  }, [])

  async function handleFetchCollectible() {
    const { result } = await getMember(userAddress, group.address)
    if (result && result.length) setMember(result[0])
  }
  return (
    <>
      <Paper
        sx={{
          width: '100%',
          p: 4,
          maxWidth: '100%',
          background: '#131416',
        }}
      >
        <Box>
          <Grid display="flex" spacing={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: '#959ca7', textAlign: 'left' }}
              >
                Your holding
              </Typography>
              <Grid container sx={{ mt: 3 }} spacing={2}>
                <Grid item xs={6} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: '#959ca7', textAlign: 'left' }}
                  >
                    Amount deposited
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'white', textAlign: 'left' }}
                  >
                    {ethers.utils.formatEther(member?.totalDeposited || 0)}{' '}
                    {depositToken.symbol}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography
                    variant="body1"
                    sx={{ color: '#959ca7', textAlign: 'left' }}
                  >
                    Club tokens (ownership share)
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'white', textAlign: 'left' }}
                  >
                    {ethers.utils.formatEther(member?.totalMinted || 0)}{' '}
                    {group.symbol} ({member?.share}%)
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default MemberDetails
