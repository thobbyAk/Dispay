import * as React from 'react'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import CircularProgress from '@mui/material/CircularProgress'

interface IComponent {
  description: string
  closeModal?: () => void
  isOpen: boolean
}
export default function PendingWalletValidation({
  description,
  closeModal,
  isOpen,
}: IComponent) {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#242526',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  }
  return (
    <>
      <Modal
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        onClose={closeModal}
        open={isOpen}
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            <CircularProgress />
          </Typography>
          <Typography
            sx={{
              mt: 3,
              color: 'white',
              textAlign: 'center',
              fontSize: '16px',
            }}
          >
            Confirm in wallet
          </Typography>

          <Typography
            sx={{
              mt: 5,
              color: '#959ca7',
              align: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
