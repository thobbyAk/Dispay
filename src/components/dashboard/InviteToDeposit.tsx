import React, { useEffect, useState } from 'react'
import {
  Paper,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
} from '@mui/material'
import { IGroup } from '@/types/group'
import { sendDepositiLink } from '@/services/api/bot'
import ClipboardCopy from '@/components/utils/ClipBoardCopy'
import AlertMessage from '@/components/AlertMessage'

interface IDetails {
  group: IGroup
}

function InviteToDeposit({ group }: IDetails) {
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<{ type: string } | undefined>(
    undefined
  )
  const baseUrl = location.protocol + '//' + location.host
  const redirectUrl = `${baseUrl}/group/${group.address}/deposit`

  async function handleSendingLink() {
    const { error } = await sendDepositiLink(group.address, redirectUrl)
    setStatus({ type: error ? 'error' : 'success' })
  }

  function ShowAlert() {
    if (!status) return <></>
    return (
      <>
        {status?.type === 'success' ? (
          <AlertMessage
            type={'success'}
            message={'An invitation has been sent to discord'}
          />
        ) : (
          <AlertMessage
            type={'error'}
            message={'Impossible to send invitation'}
          />
        )}
      </>
    )
  }

  return (
    <>
      <ShowAlert />
      <Paper
        sx={{ width: '100%', p: 4, maxWidth: '100%', background: '#131416' }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            alignSelf: 'center',
          }}
        >
          {' '}
          INVITE TO DEPOSIT
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'white',
            alignSelf: 'center',
          }}
        >
          {' '}
          Invite members by sharing your club’s deposit link
        </Typography>
        <Button
          onClick={handleSendingLink}
          disabled={loading}
          sx={{
            my: 2,
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '4px',
            cursor: 'pointer',
            textTransform: 'none',
          }}
          variant="contained"
          size="medium"
        >
          {loading && <CircularProgress size={14} />}
          {!loading && 'Send link to discord'}
        </Button>
        <TextField
          fullWidth
          value={redirectUrl}
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
            my: 3,
          }}
          type="string"
          InputProps={{ inputProps: { min: 0, max: 99 } }}
          id="botCommandId"
          variant="outlined"
        />
        <ClipboardCopy copyText={redirectUrl} />
      </Paper>
    </>
  )
}

export default InviteToDeposit
