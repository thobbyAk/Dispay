import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Avatar from 'boring-avatars'
import { IGroup } from '../../@types/group'
import { getGroup } from '../../services/api/group'

interface IGroupDetails {
  group: IGroup
}
function GroupDetails({ group }: IGroupDetails) {
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Grid display="flex" spacing={2}>
          <Grid item xs={2}>
            <Avatar
              size={36}
              name="group"
              variant="pixel"
              colors={['#ffad08', '#edd75a', '#73b06f', '#0c8f8f', '#405059']}
            />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'left' }}>
              {group?.name}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" sx={{ color: 'white', textAlign: 'left' }}>
              {group?.symbol}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid display="flex" spacing={2}>
          <Grid item sm={12} xs={4}>
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
                Deposit Limit
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'white', textAlign: 'left' }}
              >
                {group?.depositLimit} ETH
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} xs={4}>
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
                Total Deposited
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={12} xs={4}>
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
                Total Minted
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'white', textAlign: 'left' }}
              >
                {group?.totalMinted} ETH
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default GroupDetails
