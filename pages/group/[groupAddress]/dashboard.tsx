import * as React from 'react'
import Layout from '../../../components/Layout'
import {
  ListItemIcon,
  IconButton,
  Paper,
  MenuList,
  ListItemText,
  MenuItem,
  Tab,
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material'
import { getAllGroup, getGroup } from '../../../services/api/group'
import GroupDetails from '../../../components/dashboard/GroupDetails'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import SettingsIcon from '@mui/icons-material/Settings'
import CachedSharpIcon from '@mui/icons-material/CachedSharp'
import GroupAssets from '../../../components/dashboard/GroupAssets'
import { IGroup } from '../../../@types/group'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

interface IDasboard {
  group: IGroup
}
function Dashboard({ group }: IDasboard) {
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState('1')

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={120} />
      </div>
    )
  }

  return (
    <>
      <Layout>
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <GroupDetails group={group} />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 4,
                    mb: 4,
                    borderRadius: '15px',
                    background: '#0e2733',
                  }}
                >
                  <IconButton>
                    <CachedSharpIcon sx={{ color: '#24f4e9' }} />
                  </IconButton>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      alignSelf: 'center',
                      ml: 4,
                    }}
                  >
                    {' '}
                    Active
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      alignSelf: 'center',
                      cursor: 'pointer',
                      ml: 4,
                    }}
                  >
                    {' '}
                    Add Deposit
                  </Typography>
                </Box>
                <Box>
                  <Paper
                    sx={{
                      width: '100%',
                      p: 4,
                      maxWidth: '100%',
                      background: '#131416',
                    }}
                  >
                    <MenuList>
                      <MenuItem sx={{ p: 2 }}>
                        <ListItemIcon>
                          <WorkspacePremiumIcon
                            sx={{ color: 'white' }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary="Create an off-chain legal entity"
                        />
                      </MenuItem>
                      <MenuItem sx={{ p: 2 }}>
                        <ListItemIcon>
                          <BorderColorIcon
                            sx={{ color: 'white' }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }}>
                          Sign legal agreements
                        </ListItemText>
                      </MenuItem>
                      <MenuItem sx={{ p: 2 }}>
                        <ListItemIcon>
                          <SettingsIcon
                            sx={{ color: 'white' }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'white' }}>
                          Modify settings
                        </ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: '#959ca7' }}>
                <TabList
                  sx={{
                    '&& .MuiTab-root': {
                      color: '#959ca7',
                      ':hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    },
                    '&& .Mui-selected': {
                      '&, & .MuiListItemText-root': {
                        color: '#ffffff',
                        borderBottom: '2px solid #ffffff',
                        fontSize: '16px',
                      },
                    },
                    '& .MuiTabs-indicator': {
                      display: 'flex',
                      height: '3px',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      '& > span': {
                        maxWidth: 60,
                        width: '100%',
                        backgroundColor: '#1976d2',
                      },
                    },
                  }}
                  onChange={handleChange}
                  aria-label="tabs"
                >
                  <Tab label="Assets" value="1" />
                  <Tab label="Members" value="2" />
                  <Tab label="Activity" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <GroupAssets />
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const { result } = await getAllGroup()
  if (!result) return
  const paths = result.map((res: any) => ({
    params: { groupAddress: res.address.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
  const { result } = await getGroup(params.groupAddress)

  return {
    props: {
      group: result,
    },
  }
}

export default Dashboard
