import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DrawerMenu from './drawer';
import Image from 'next/image';
import Modal from "@mui/material/Modal";
import Avatar from "boring-avatars";

import { textTransform } from '@mui/system';
import { BorderRight } from '@mui/icons-material';
import { ethers } from 'ethers';
import { shortenAddress } from './utils/util';

const drawerWidth = 140;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
    const [userAddress, setWalletAddress] = React.useState("")
    const [noMetamaskModal, shownoMetamaskModal] = React.useState(false);
    const noMetaMaskModalClose = () => {
        shownoMetamaskModal(false);
    };
    React.useEffect(()=>{
        if(localStorage.getItem("account")){
            const existingUser: any = localStorage.getItem("account")
            setWalletAddress(existingUser);
        }
    },[])
    async function requestAccount() {
        if((window as any).ethereum){
            try {
                const accounts = await (window as any).ethereum.request({
                    method: "eth_requestAccounts"
                })
                setWalletAddress(accounts[0]);
                localStorage.setItem("account", accounts[0]);
            } catch (error) {
                console.log(error)
            }
        }else{
            //show download metamask modal
            shownoMetamaskModal(true);
        }
    }

    async function connectWallet() {
        if(typeof (window as any).ethereum !== 'undefined'){
            await requestAccount();
            const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        }else{

        }
    }

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 320,
        bgcolor: "#242526",
        borderRadius: "25px",
        boxShadow: 24,
        p: 4,
      };
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
       <Box sx={modalStyle}
       >
           <Typography sx={{color:"white"}}>
               You do no have metamask installed on this browser
               Please install <a style={{color:"blue"}} href='https://metamask.io/'> Metamask</a>
           </Typography>

       </Box>
    </Modal>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
      sx={{
        backgroundColor:"black"
      }}
       position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            
          </Typography>
          {
              userAddress ? (
                  <>
                    <Button
                startIcon={
                    <Avatar
                    size={36}
                    name={userAddress}
                    variant="pixel"
                    colors={[
                      "#ffad08",
                      "#edd75a",
                      "#73b06f",
                      "#0c8f8f",
                      "#405059",
                    ]}
                  />
                }
                 variant='outlined'
                 sx={{
                     border: "1px solid white",
                     color:"white",
                     textTransform:"none"
                 }}
                 >
                     {shortenAddress(userAddress)}
                 </Button>
                  </>
              
              ):(
                  <>
                     <Button
                onClick={requestAccount}
                startIcon={
                    <Image
                    src={"/images/metamask.png"}
                    width={45}
                    height={32}
                    alt={`metamask Icon`}
                />
                }
                 variant='outlined'
                 sx={{
                     border: "1px solid white",
                     color:"white",
                     textTransform:"none"
                 }}
                 >
                     Connect to Metamask
                 </Button>
                  </>
             
              )
          }
       
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={
          {
              sx:{
                  backgroundColor:"black",
                  borderRight: "1px solid rgb(243 243 243 / 12%)"
                  
              }
          }
        }
          variant="permanent"
          anchor="left"
          sx={{
            boxShadow: "0px 0px 5px rgb(0 0 0 / 20%)",
            BorderRight:"1px solid #3E4042",
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
              
              width: drawerWidth,
          }}
        >
          <DrawerMenu />
        </Drawer>
    </Box>
    </>
    
  );
}
