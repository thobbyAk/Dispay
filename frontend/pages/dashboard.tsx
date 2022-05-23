import * as React from 'react';
import Layout from '../componets/Layout'
import Avatar from "boring-avatars";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";

import CachedSharpIcon from '@mui/icons-material/CachedSharp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SettingsIcon from '@mui/icons-material/Settings';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useRouter } from "next/router";
// import { weiConverter } from '../componets/utils/util';
// const Web3 = require('web3');




function TabPanel(props:any) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{p:4}}>
           {children}
          </Box>
        )}
      </div>
    );
  }


  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function Dashboard ({collections}: {
    collections: any;
}){

    type groupValues = {
        groupName:string,
        groupSymbol: string,
        depositLimit: string,
        owner: string,
        totalDeposited: string,
        totalMinted: string,
        treasureAddress: string
      }

    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const [collectibles, setCollectibles] = React.useState(collections);
    const [value, setValue] = React.useState(0);
    const [subvalue, setSubValue] = React.useState(0);
    const [group, setGroup] = React.useState<groupValues>({
        groupName:"",
        groupSymbol: "",
        depositLimit: "",
        owner: "",
        totalDeposited: "",
        totalMinted: "",
        treasureAddress: ""
    });

    const handleChange = (event: any, newValue: any) => {
      setValue(newValue);
    };
    const handleChangeSubTab = (event: any, newValue: any) => {
        setSubValue(newValue);
      };

    React.useEffect(()=> {
        if(router.isReady){
            const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
            if(groupDetails !== ''){
              getGroupDeatils()
            }else{
                router.push({
                    pathname:"/"
                })
            }

        }
    },[router.isReady, router.query, router.pathname])

    const getGroupDeatils = async () => {
        setLoading(true);
        const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
          const currentGroupAddress: any = groupDetails?.args[0]
          const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
          const response = await fetch(`http://207.154.202.18:3000/groups/${currentGroupAddress}`, requestOptions);
          const jsonData = await response.json();
            console.log("currentGroup", jsonData)
            setGroup(jsonData);
            setLoading(false)
      }

      const addDeposit = async () => {
          setLoading(true);
          const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
          const currentGroupAddress: any = groupDetails?.args[0]
          console.log("groupDetails", groupDetails)
          const data = {
            groupAddress: currentGroupAddress,
            redirectUrl:"http://localhost:3000/dashboard"
          }
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch(`http://207.154.202.18:3000/bot/depostit`, requestOptions);
         const jsonData = await response.json();
         setLoading(false);
      }

      if (loading) {
        return (
          <div
            style={{
              display: "flex",
              width: "100vw",
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={120} />
          </div>
        );
      }

    return (
        <>
            <Layout>
                <Container>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <Box sx={{my:4}}>
                                <Grid 
                                display="flex"
                                spacing={2}>
                                    <Grid item xs={2}>
                                        <Avatar
                                         size={36}
                                         name="group"
                                         variant="pixel"
                                         colors={[
                                           "#ffad08",
                                           "#edd75a",
                                           "#73b06f",
                                           "#0c8f8f",
                                           "#405059",
                                         ]}
                                        />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography variant='h5' sx={{color:"white", textAlign:"left"}}>{group?.groupName}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant='h5' sx={{color:"white", textAlign:"left"}}>{group?.groupSymbol}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid display="flex" spacing={2}>
                                    <Grid item sm={12} xs={4}>
                                        <Box 
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column'
                                        }}>
                                            <Typography variant='body1' sx={{color:"#959ca7", textAlign:"left"}}>Deposit Limit</Typography>
                                            <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>{group?.depositLimit} ETH</Typography>

                                        </Box>
                                      
                                    </Grid>
                                    <Grid item sm={12} xs={4}>
                                        <Box 
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column'
                                        }}>
                                            <Typography variant='body1' sx={{color:"#959ca7", textAlign:"left"}}>Total Deposited</Typography>
                                            <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>{group?.totalDeposited} ETH</Typography>

                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} xs={4}>
                                         <Box 
                                        sx={{
                                            display:'flex',
                                            flexDirection:'column'
                                        }}>
                                            <Typography variant='body1' sx={{color:"#959ca7", textAlign:"left"}}>Total Minted</Typography>
                                            <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>{group?.totalMinted} ETH</Typography>

                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <Box sx={{
                                display:"flex",
                                flexDirection:"row",
                                p:4,
                                mb:4,
                                borderRadius:"15px",
                                background:"#0e2733"

                            }}>
                                <IconButton>
                                    <CachedSharpIcon sx={{color:"#24f4e9"}}/>

                                </IconButton>
                                <Typography variant='h5' sx={{
                                    color: "white",
                                    alignSelf: "center",
                                    ml:4
                                }}> Active</Typography>
                                

                                <Typography 
                                onClick={addDeposit}
                                variant='h5' sx={{
                                    color: "white",
                                    alignSelf: "center",
                                    cursor:"pointer",
                                    ml:4
                                }}> Add Deposit</Typography>


                            </Box>
                            <Box>
                            <Paper sx={{ width: "100%", p:4 ,maxWidth: '100%', background:"#131416" }}>
                                <MenuList>
                                    <MenuItem sx={{p:2}}>
                                    <ListItemIcon>
                                        <WorkspacePremiumIcon sx={{color:"white"}} fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText  sx={{color:"white"}} primary="Create an off-chain legal entity" />
                                    
                                    </MenuItem>
                                    <MenuItem sx={{p:2}}>
                                    <ListItemIcon>
                                        <BorderColorIcon sx={{color:"white"}} fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText  sx={{color:"white"}} >Sign legal agreements</ListItemText>
                                  
                                    </MenuItem>
                                    <MenuItem sx={{p:2}}>
                                    <ListItemIcon>
                                        <SettingsIcon sx={{color:"white"}} fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText  sx={{color:"white"}}>Modify settings</ListItemText>
                                   
                                    </MenuItem>
                                   
                                </MenuList>
                            </Paper>

                            </Box>

                        </Grid>


                    </Grid>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: '#959ca7' }}>
                        <Tabs 
                        sx={{
                            "&& .MuiTab-root": {
                              color: "#959ca7",
                              ":hover": {
                                backgroundColor: "rgba(255,255,255,0.1)",
                              },
                            },
                            "&& .Mui-selected": {
                              "&, & .MuiListItemText-root": {
                                  color:"#ffffff",
                                  borderBottom: "2px solid #ffffff",
                                fontSize: "16px",
                              },
                            },
                            "& .MuiTabs-indicator": {
                              display: "flex",
                              height: "3px",
                              justifyContent: "center",
                              backgroundColor: "transparent",
                              "& > span": {
                                maxWidth: 60,
                                width: "100%",
                                backgroundColor: "#1976d2",
                              },
                            },
                          }}
                        value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Assets" {...a11yProps(0)} />
                        <Tab label="Members" {...a11yProps(1)} />
                        <Tab label="Activity" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                 
                            <Grid container spacing={2}>
                             
                                {
                                    collectibles && (
                                        <>
                                {
                                    
                                    
                                    collectibles?.map((data: any, index: any) =>(
                                        <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                                            <Card
                                            sx={{
                                                background:"#000000",
                                                border:"1px solid #959ca7",
                                                height:"20rem"
                                            }} >
                                                <CardActionArea>
                                                    <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={data?.logo_url}
                                                    alt="green iguana"
                                                    />
                                                    <CardContent>
                                                    <Typography sx={{color:"white",textAlign:"left"}} gutterBottom variant="h5" component="div">
                                                        {data?.collection_name}
                                                    </Typography>
                                                    <Box sx={{
                                                        position:"absolute",
                                                        top:"90%"
                                                    }}>
                                                    <Typography sx={{textAlign:"left", mt:4, color:"#959ca7"}}  variant="body2" >
                                                      Floor Price
                                                    </Typography>
                                                    <Typography sx={{color:"white",textAlign:"left", mt:1}}  variant="body2" color="text.secondary">
                                                     {data?.statistics?.floor} ETH 
                                                    </Typography>
                                                    </Box>
                                                   
                                                    </CardContent>
                                                </CardActionArea>

                                            </Card>
                                        </Grid>
                                        
                                          
                                    ))
                                }
                                        </>
                                    )
                                }
                               
                                
                            </Grid>
                       
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>
                </Container>
              

            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://api.modulenft.xyz/api/v1/opensea/collection/rankings?sort_by=SEVEN_DAY_VOLUME&count=100&offset=0')
    const json = await res.json()
  
    return {
      props: {
        collections: json.rankings,
      },
    }
  }

export default Dashboard

