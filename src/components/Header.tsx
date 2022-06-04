import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Image from 'next/image'
import Modal from '@mui/material/Modal'
import Avatar from 'boring-avatars'
import Grid from '@mui/material/Grid'
import { ethers } from 'ethers'
import { shortenAddress } from '@/services/utils/util'
import Container from '@mui/material/Container'
import Link from 'next/link'
import useLocalStorage from '@/hooks/localStorage'

export default function Header() {
  const [mounted, setMounted] = React.useState(false);
  const [userAddress, setWalletAddress] = useLocalStorage<string>('account', '')
  React.useEffect(() => setMounted(true), []);
  const [noMetamaskModal, shownoMetamaskModal] = React.useState(false)
  const noMetaMaskModalClose = () => {
    shownoMetamaskModal(false)
  }

  const [anchorElWalletInfo, setAnchorElWalletInfo] =
    React.useState<HTMLButtonElement | null>(null)
  const handleOpenWalletInfo = (event: any) => {
    setAnchorElWalletInfo(event.currentTarget)
  }
  const handleCloseWalletInfo = () => {
    setAnchorElWalletInfo(null)
  }
  const [anchorElMore, setAnchorElMore] =
    React.useState<HTMLButtonElement | null>(null)
  const handleOpenMore = (event: any) => {
    setAnchorElMore(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorElMore(null)
  }
  async function requestAccount() {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        })
        setWalletAddress(accounts[0])
      } catch (error) {
        console.log(error)
      }
    } else {
      shownoMetamaskModal(true)
    }
  }

  async function connectWallet() {
    if (typeof (window as any).ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      )
    } else {
    }
  }
  async function disconnect() {
    setWalletAddress('')
    localStorage.removeItem('account')
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: '#242526',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
  }
  if(!mounted) return(<></>);
  return (
    <>
      <Modal
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        onClose={noMetaMaskModalClose}
        open={noMetamaskModal}
      >
        <Box sx={modalStyle}>
          <Typography sx={{ color: 'white' }}>
            You do no have metamask installed on this browser Please install{' '}
            <a style={{ color: 'blue' }} href="https://metamask.io/">
              {' '}
              Metamask
            </a>
          </Typography>
        </Box>
      </Modal>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: 'black',
          }}
        >
          <Container>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: 'none', md: 'flex', sm: 'flex' },
                  flexGrow: 1,
                }}
              >
                Portfolio
              </Typography>
              <Box
                sx={{
                  ml: { sx: 0, md: 15, sm: 15 },
                }}
              >
                <Link href="/">
                  <a>
                    <Image
                      src={'/images/lootbase-white.png'}
                      width={60}
                      height={32}
                      alt={`lootbase Icon`}
                    />
                  </a>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }} />

              <Box
                sx={{
                  display: 'flex',
                }}
              >
                {userAddress ? (
                  <>
                    <Button
                      onClick={handleOpenWalletInfo}
                      startIcon={
                        <Avatar
                          size={36}
                          name={userAddress}
                          variant="pixel"
                          colors={[
                            '#ffad08',
                            '#edd75a',
                            '#73b06f',
                            '#0c8f8f',
                            '#405059',
                          ]}
                        />
                      }
                      endIcon={<KeyboardArrowDownIcon />}
                      variant="outlined"
                      sx={(theme) => ({
                        borderRadius: (theme.shape.borderRadius = 30),
                        background: '#131416',
                        border: 'none',
                        color: 'white',
                        textTransform: 'none',
                      })}
                    >
                      {shortenAddress(userAddress)}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={requestAccount}
                      startIcon={
                        <Image
                          src={'/images/metamask.svg'}
                          width={45}
                          height={32}
                          alt={`metamask Icon`}
                        />
                      }
                      variant="outlined"
                      sx={{
                        border: '1px solid white',
                        color: 'white',
                        textTransform: 'none',
                      }}
                    >
                      Connect to Metamask
                    </Button>
                  </>
                )}

                <Popover
                  open={Boolean(anchorElWalletInfo)}
                  anchorEl={anchorElWalletInfo}
                  onClose={handleCloseWalletInfo}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    mt: '45px',
                  }}
                  PaperProps={{
                    sx: {
                      background: 'black',
                      border: '1px solid grey',
                      borderRadius: '10px',
                      width: 330,
                    },
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          flexGrow: 1,
                          p: 2,
                          background: '#131416',
                          BorderTopRounded: 3,
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                          }}
                        >
                          {shortenAddress(userAddress)}
                        </Typography>
                      </Box>
                      <Divider
                        sx={{
                          height: '1px',
                          width: '100%',
                          background: 'white',
                        }}
                      />
                      <List
                        sx={{
                          width: '100%',
                        }}
                      >
                        <ListItem
                          sx={{
                            ':hover': {
                              background: '#131416',
                            },
                          }}
                        >
                          <ListItemButton>
                            <ListItemText
                              sx={{ color: 'white' }}
                              primary="Copy Address"
                            />
                            <ListItemIcon>
                              <ContentCopyIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                        <ListItem
                          sx={{
                            ':hover': {
                              background: '#131416',
                            },
                          }}
                        >
                          <ListItemButton>
                            <ListItemText
                              sx={{ color: 'white' }}
                              primary="View on Etherscan"
                            />
                            <ListItemIcon>
                              <OpenInNewIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <Button
                            onClick={disconnect}
                            fullWidth
                            sx={{
                              border: 'none',
                              background: 'white',
                              color: 'black',
                            }}
                          >
                            Disconnect
                          </Button>
                        </ListItem>
                      </List>
                    </Grid>
                  </Box>
                </Popover>
                <IconButton
                  onClick={handleOpenMore}
                  sx={{
                    ml: 1,
                    borderRadius: (theme) => (theme.shape.borderRadius = 30),
                    background: '#131416',
                  }}
                >
                  <MoreHorizIcon sx={{ color: 'white' }} />
                </IconButton>
                <Popover
                  open={Boolean(anchorElMore)}
                  anchorEl={anchorElMore}
                  onClose={handleCloseMore}
                  keepMounted
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{
                    mt: '45px',
                  }}
                  PaperProps={{
                    sx: {
                      background: 'black',
                      border: '1px solid grey',
                      borderRadius: '10px',
                      width: 230,
                    },
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <List
                        sx={{
                          width: '100%',
                        }}
                      >
                        <ListItem
                          sx={{
                            ':hover': {
                              background: '#131416',
                            },
                          }}
                        >
                          <ListItemButton
                            component="a"
                            href="https://discord.gg/NMY68wfA"
                          >
                            <ListItemText
                              sx={{ color: 'white' }}
                              primary="Discord"
                            />
                          </ListItemButton>
                        </ListItem>
                        <ListItem
                          sx={{
                            ':hover': {
                              background: '#131416',
                            },
                          }}
                        >
                          <ListItemButton
                            component="a"
                            href="https://www.instagram.com/dyspay.finance/"
                          >
                            <ListItemText
                              sx={{ color: 'white' }}
                              primary="Instagram"
                            />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Grid>
                  </Box>
                </Popover>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  )
}
