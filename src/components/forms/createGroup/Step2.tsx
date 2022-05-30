import * as React from 'react'
import { IGroup } from '@/types/group'
import { TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import MenuItem from '@mui/material/MenuItem'
import { useFormContext } from 'react-hook-form'

interface IStepper {
  nextFormStep: () => void
  prevFormStep: () => void
  tokens: any
}

export default function Step2({
  nextFormStep,
  prevFormStep,
  tokens,
}: IStepper) {
  const { register, getValues, setValue, handleSubmit } =
    useFormContext<IGroup>()

  const tokenSelected = getValues('token')
  if (!tokenSelected) setValue('token', tokens[0])

  function onSubmit(data: any) {
    console.log(data)
    nextFormStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <Typography variant="h6" sx={{ color: 'white', textAlign: 'left' }}>
          What’s the upper limit of the group raise?
        </Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: '#959ca7', my: 3, textAlign: 'left' }}
        >
          Accepting deposits beyond this amount will require an on-chain
          transaction with gas, so aim high.
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', textAlign: 'left' }}>
          Raise in
        </Typography>

        <TextField
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          select
          defaultValue={
            tokenSelected ? tokenSelected.address : tokens[0].address
          }
          sx={{
            input: { color: 'white' },
            label: { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '& svg': {
                color: 'white',
              },
              '&:hover fieldset': {
                borderColor: (theme) => theme.palette.primary.main,
              },
              '& .MuiSelect-select': {
                color: 'white',
              },
            },
            my: 2,
          }}
          variant="outlined"
        >
          {tokens?.map((token: any, index: any) => (
            <MenuItem
              onClick={() => setValue('token', token)}
              key={index}
              value={token?.address}
            >
              <img
                alt="logo"
                style={{ marginRight: '10px' }}
                src={token?.logoURI}
              ></img>
              {token?.name}{' '}
              <span style={{ marginLeft: '13px' }}>{token?.symbol}</span>
            </MenuItem>
          ))}
        </TextField>
        <Typography
          variant="body1"
          sx={{ color: 'white', mt: 3, textAlign: 'left' }}
        >
          Upper limit
        </Typography>

        <TextField
          fullWidth
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
            my: 2,
          }}
          {...register('depositLimit', { required: true })}
          type="number"
          id="depositLimit"
          label="Upper limit"
          variant="outlined"
        />
        <Box
          component="span"
          m={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            startIcon={
              <KeyboardBackspaceIcon
                sx={{
                  color: 'white',
                }}
              />
            }
            onClick={prevFormStep}
            sx={{
              my: 2,
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'none',
            }}
            variant="text"
            size="medium"
          >
            Back
          </Button>
          <Button
            type="submit"
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
            Next
          </Button>
        </Box>
      </>
    </form>
  )
}