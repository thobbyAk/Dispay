import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const drawerWidth = 140;


export default function DrawerMenu() {
    return(
        <>
       
        <IconButton
        sx={{
            mt:3
        }} edge="start" size="small">
        <Link href="/">
            <a>
            <Image
                src={"/images/dispay.png"}
                width={45}
                height={32}
                alt={`Dispay Icon`}
            />
            </a>
        </Link>
        </IconButton>
        {/* <Toolbar /> */}
        <Divider />
        <List >
         
            <Link href="/explore" passHref>
            <ListItem
            sx={{
                cursor:"pointer",

                my:4,
                justifyContent:"center",
                ":hover":{
                    borderRadius: (theme) => theme.shape.borderRadius,
                        // backgroundColor:"white"
                    }
            }}  >
                <Tooltip title="Explore">
                <ListItemIcon
                        sx={{
                            borderRadius: (theme) => theme.shape.borderRadius,
                        
                        }} >
                        <ExploreIcon
                        fontSize="large" sx={{color: "white"}}/>
                        </ListItemIcon>
                </Tooltip>
           
             
            </ListItem>
            </Link>
            <Link href="/clubs" passHref>
            <ListItem
            sx={{
                cursor:"pointer",

                my:4,
                justifyContent:"center",
                ":hover":{
                    borderRadius: (theme) => theme.shape.borderRadius,
                        // backgroundColor:"white"
                    }
            }}  >
                <Tooltip title="My Clubs">
                <ListItemIcon
                        sx={{
                            borderRadius: (theme) => theme.shape.borderRadius,
                        
                        }} >
                        <GroupsIcon
                        fontSize="large" sx={{color: "white"}}/>
                        </ListItemIcon>
                </Tooltip>
           
             
            </ListItem>
            </Link>
           
            <ListItem
            sx={{
                cursor:"pointer",

                my:4,
                justifyContent:"center",
                ":hover":{
                    borderRadius: (theme) => theme.shape.borderRadius,
                        // backgroundColor:"white"
                    }
            }}  >
                <Tooltip title="Favorite">
                <ListItemIcon
                        sx={{
                            borderRadius: (theme) => theme.shape.borderRadius,
                        
                        }} >
                        <FavoriteIcon
                        fontSize="large" sx={{color: "white"}}/>
                        </ListItemIcon>
                </Tooltip>
           
             
            </ListItem>
            <ListItem
            sx={{
                cursor:"pointer",
                my:4,
                justifyContent:"center",
                ":hover":{
                    borderRadius: (theme) => theme.shape.borderRadius,
                        // backgroundColor:"white"
                    }
            }}  >
                <Tooltip title="Settings">
                <ListItemIcon
                        sx={{
                            borderRadius: (theme) => theme.shape.borderRadius,
                        
                        }} >
                        <SettingsIcon
                        fontSize="large" sx={{color: "white"}}/>
                        </ListItemIcon>
                </Tooltip>
           
             
            </ListItem>
            
          
         
        </List>
        <Divider />
       
        </>
    )
}