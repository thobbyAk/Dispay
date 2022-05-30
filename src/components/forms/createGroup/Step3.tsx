import * as React from 'react'
import { IGroup } from '@/types/group'
import { TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import { useFormContext } from 'react-hook-form'

interface IStepper {
  nextFormStep: () => void
  prevFormStep: () => void
}

export default function Step3({ nextFormStep, prevFormStep }: IStepper) {
  const { register, setValue, handleSubmit, getValues } = useFormContext<IGroup>()

  const [datePickerValue, setValueDatePickerValue] =
    React.useState<Date | null>()

  function onSubmit(data: any) {
    nextFormStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <Typography variant="h6" sx={{ color: 'white', textAlign: 'left' }}>
          When will deposits close?
        </Typography>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: '#959ca7', my: 3, textAlign: 'left' }}
        >
          Extending the close date will require an on-chain transaction with
          gas, so aim for further in the future to leave ample time for
          collection. You can close deposits early if needed.
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            desktopModeMediaQuery=""
            value={getValues('depositEndDate')}
            allowSameDateSelection={true}
            disablePast
            label="Start Date"
            views={['day']}
            onChange={(newValue: any) => {
              setValueDatePickerValue(newValue)
              if(newValue) setValue('depositEndDate', newValue)
            }}
            PopperProps={{
              disablePortal: true,
            }}
            inputFormat="MMM d, Y"
            InputAdornmentProps={{
              position: 'start',
            }}
            OpenPickerButtonProps={{ disableRipple: true }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  mt: 3,
                  input: { color: 'white' },
                  label: { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },

                    '& svg': {
                      color: 'white',
                    },
                    '&:hover button': {
                      backgroundColor: 'transparent',
                    },
                  },
                }}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </LocalizationProvider>
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
