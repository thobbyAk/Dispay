import * as React from 'react'
import Layout from '@/components/Layout'
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
import { getAllGroup, getGroupByAddress } from '@/services/api/group'
import Details from '@/components/dashboard/Details'
import MemberDetails from '@/components/dashboard/MemberDetail'
import CachedSharpIcon from '@mui/icons-material/CachedSharp'
import AssetList from '@/components/dashboard/AssetList'
import { IGroup } from '@/types/group'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import MemberList from '@/components/dashboard/MemberList'
import useLocalStorage from '@/hooks/localStorage'
import Action from '@/components/dashboard/Action'
import DepositStatus from '@/components/dashboard/DepositStatus'
import InviteToDeposit from '@/components/dashboard/InviteToDeposit'

interface IDasboard {
  group: IGroup
}
function Dashboard({ group }: IDasboard) {
  const [loading, setLoading] = React.useState(false)
  const [userAddress] = useLocalStorage<string>('account', '')
  const [value, setValue] = React.useState('1')
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

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
    mounted && (
      <>
        <Layout>
          <Container>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                  <Details group={group} />
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                  <Box>
                    <DepositStatus group={group} />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    {userAddress == group.owner && (
                      <InviteToDeposit group={group} />
                    )}
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <MemberDetails group={group} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: '100%', mt: 10 }}>
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
                  <AssetList />
                </TabPanel>
                <TabPanel value="2">
                  <MemberList group={group} />
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
          </Container>
        </Layout>
      </>
    )
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
  const { result } = await getGroupByAddress(params.groupAddress)

  return {
    props: {
      group: result,
    },
  }
}

export default Dashboard
