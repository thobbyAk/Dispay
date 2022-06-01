import * as React from 'react'
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { createBot } from '@/services/api/bot'
import ClipboardCopy from '@/components/utils/ClipBoardCopy'
import useLocalStorage from 'src/hooks/localStorage'

function BotCallBack() {
  const router = useRouter()
  const [isBotCreated, setIsBotCreated] = React.useState(true)
  const [botId, setBotId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const [pendingAddress, setPendingAddress] = useLocalStorage<string>(
    'groupAddressPending',
    ''
  )

  React.useEffect(() => {
    if (router.isReady) {
      setIsLoading(false)
      if (pendingAddress) handleBotCreation(pendingAddress)
    }
  }, [router.isReady, router.query, router.pathname])

  async function handleBotCreation(pendingAddress: string) {
    if (pendingAddress) {
      const { result, error } = await createBot({
        groupAddress: pendingAddress,
      })
      if (result) {
        setBotId(result._id)
        // localStorage.removeItem('pendingAddress')
      }
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
                <Button
                  onClick={() => router.push(`/group/${pendingAddress.toLowerCase()}/dashboard`)}
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
                  Go to dashboard
                </Button>
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
              {pendingAddress ? (
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
