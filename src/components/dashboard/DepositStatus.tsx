import React, { useEffect, useState } from 'react'
import {
  Paper,
  Typography,
} from '@mui/material'
import { IGroup } from '@/types/group'


interface IDetails {
  group: IGroup
}
function DepositStatus({ group }: IDetails) {
  const depositEndDate = new Date(Number(group.depositEndDate))
  const oneDay = 1000*60*60*24;
  const timeRemaining = (depositEndDate.getTime() - new Date().getTime()) / oneDay;

  return (
    <>
      <Paper
        sx={{ width: '100%', p: 4, maxWidth: '100%', background: '#0e2733' }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            alignSelf: 'center',
            ml: 4,
          }}
        >
          {' '}
          Open to deposits Closes in {Math.ceil(timeRemaining)} days
        </Typography>
      </Paper>
    </>
  )
}

export default DepositStatus
