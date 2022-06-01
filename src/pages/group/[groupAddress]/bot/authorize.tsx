import * as React from 'react'
import { Grid, Button, Typography, Box, Link } from '@mui/material'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import useLocalStorage from 'src/hooks/localStorage'

function Authorize() {
  const router = useRouter()
  const [pendingAddress, setPendingAddress] = useLocalStorage<string>(
    'groupAddressPending',
    ''
  )

  React.useEffect(() => {
    if (router.isReady) {
      const { groupAddress } = router.query
      if (groupAddress) setPendingAddress(groupAddress.toString())
    }
  }, [router.isReady, router.query, router.pathname])

  const redirectUri = process.env.redirectUri
  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=974402155425431603&permissions=0&redirect_uri=${redirectUri}&response_type=code&scope=bot%20identify`
  return (
    <>
      <Layout>
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
                🚀 Group Created Successfully
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  textAlign: 'center',
                  color: '#959ca7',
                }}
              >
                Please click below to authorize group Bot
              </Typography>
              <Box
                sx={{
                  mt: 5,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link href={discordUrl}>
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
                    Authorize Bot
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Layout>
    </>
  )
}

export default Authorize
