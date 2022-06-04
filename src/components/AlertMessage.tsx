import * as React from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

interface IAlert {
  type: AlertColor
  message: string
}
export default function AlertMessage({ type, message }: IAlert) {
  const [open, setOpen] = React.useState(true)
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }
  return (
    <Snackbar
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={2000}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
