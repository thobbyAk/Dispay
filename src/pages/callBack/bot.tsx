import * as React from 'react'
import {
  Grid,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { createBot } from '@/services/api/bot'
import ClipboardCopy from '@/components/utils/ClipBoardCopy'

function BotCallBack() {
  const router = useRouter()
  const [groupAddress, setGroupAddress] = React.useState<string | null>(null)
  const [isBotCreated, setIsBotCreated] = React.useState(true)
  const [botId, setBotId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (router.isReady) {
      const groupAddress = localStorage.getItem('groupAddressPending')
      setGroupAddress(groupAddress)
      setIsLoading(false)
      if (groupAddress) handleBotCreation(groupAddress.toString())
    }
  }, [router.isReady, router.query, router.pathname])

  async function handleBotCreation(groupAddress: string) {
    if (groupAddress) {
      const { result, error } = await createBot({ groupAddress })
      setBotId(result._id)
      localStorage.removeItem('groupAddressPending')
    }
  }

  function BotCreate() {
    if (isBotCreated)
      return (
        <>
          <Typography
            sx={{
              color: 'white',
              textAlign: 'center',
            }}
          >
            Bot Created Successfully
          </Typography>
          <Typography
            sx={{
              mt: 3,
              color: '#959ca7',
              textAlign: 'center',
            }}
          >
            Please copy the message below and paste on your server to setup Bot
          </Typography>
          <Box
            sx={{
              mt: 5,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                cursor: 'pointer',
                color: 'white',
                fontSize: '16px',
              }}
            >
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                }}
              >
                <TextField
                  fullWidth
                  value={'!setup' + botId}
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
                <ClipboardCopy copyText={'!setup' + botId} />
              </Box>
            </Typography>
          </Box>
        </>
      )
    return (
      <>
        <CircularProgress />
        <Typography
          variant="body1"
          sx={{
            mt: 3,
            textAlign: 'center',
            color: 'white',
          }}
        >
          bot in creation....
        </Typography>
      </>
    )
  }

  return (
    !isLoading && (
      <>
        <Layout>
          <Box sx={{ p: 5 }}>
            <Grid
              container
              direction="row"
              justifyContent="Center"
              alignItems="center"
            >
              {groupAddress ? (
                <>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: 'center',
                        color: 'white',
                      }}
                    >
                      <BotCreate />
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ p: 5 }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="Center"
                      alignItems="center"
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: 'center',
                            color: 'white',
                          }}
                        >
                          You are lost ... 😢
                        </Typography>
                      </Box>
                    </Grid>
                  </Box>
                </>
              )}
            </Grid>
          </Box>
        </Layout>
      </>
    )
  )
}

export default BotCallBack
