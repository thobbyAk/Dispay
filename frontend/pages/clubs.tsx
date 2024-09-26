import type { NextPage } from 'next'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from '../componets/Layout'
import styles from '../styles/Home.module.css'
import  Grid  from '@mui/material/Grid';
import { textTransform } from '@mui/system';
import { IconButton } from '@mui/material';

function Clubs(){
  return(
    <>
    <Layout>
      <Box sx={{p:5}}>
      <Typography variant='h5' sx={{color:"white", mb:5}}>Active Investment Clubs</Typography>
          <Grid
           container
           rowSpacing={1}
           columnSpacing={{ xs: 2, sm: 2, md: 4 }}>
            <Grid item xs={3}>
            <Card sx={{
                ":hover":{
                    transform: "scale(1.1)"
                },
                transition: "all .2s ease-in-out",
                borderRadius:"0.5rem",
                backgroundColor:"rgb(11, 11, 11)",
                border:"1px solid rgb(226, 226, 228,1)",
                 maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="240"
                image={"/images/test.jpeg"}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom sx={{color:"white"}} variant="h5" component="div">
                Lazy Group
                </Typography>
                <Typography gutterBottom sx={{color:"white"}} variant="body2" >
                Subscribe for 0.3ETH
                </Typography>
                <Typography sx={{color:"white"}} variant="body2" >
                6 Members
                </Typography>
            </CardContent>
            <Box
             sx={{
                 p:2,
                display:"flex",
                flexDirection:"column"
            }}>
            
                <Button
                sx={{
                    mb:3,
                    textTransform:"none",
                    cursor:"pointer",
                    backgroundColor:"rgb(11, 11, 11)",
                }}
                 fullWidth variant='outlined' size="medium">View Club</Button>
            </Box>
            </Card>
            </Grid>
            <Grid item xs={3}>
            <Card sx={{
                ":hover":{
                    transform: "scale(1.1)"
                },
                transition: "all .2s ease-in-out",
                borderRadius:"0.5rem",
                backgroundColor:"rgb(11, 11, 11)",
                border:"1px solid rgb(226, 226, 228,1)",
                 maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="240"
                image={"/images/test.jpeg"}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom sx={{color:"white"}} variant="h5" component="div">
                Lazy Group
                </Typography>
                <Typography gutterBottom sx={{color:"white"}} variant="body2" >
                Subscribe for 0.3ETH
                </Typography>
                <Typography sx={{color:"white"}} variant="body2" >
                6 Members
                </Typography>
            </CardContent>
            <Box
             sx={{
                 p:2,
                display:"flex",
                flexDirection:"column"
            }}>
            
                <Button
                sx={{
                    mb:3,
                    textTransform:"none",
                    cursor:"pointer",
                    backgroundColor:"rgb(11, 11, 11)",
                }}
                 fullWidth variant='outlined' size="medium">View Club</Button>
            </Box>
            </Card>
            </Grid>
            <Grid item xs={3}>
            <Card sx={{
                ":hover":{
                    transform: "scale(1.1)"
                },
                transition: "all .2s ease-in-out",
                borderRadius:"0.5rem",
                backgroundColor:"rgb(11, 11, 11)",
                border:"1px solid rgb(226, 226, 228,1)",
                 maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="240"
                image={"/images/test.jpeg"}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom sx={{color:"white"}} variant="h5" component="div">
                Lazy Group
                </Typography>
                <Typography gutterBottom sx={{color:"white"}} variant="body2" >
                Subscribe for 0.3ETH
                </Typography>
                <Typography sx={{color:"white"}} variant="body2" >
                6 Members
                </Typography>
            </CardContent>
            <Box
             sx={{
                 p:2,
                display:"flex",
                flexDirection:"column"
            }}>
            
                <Button
                sx={{
                    mb:3,
                    textTransform:"none",
                    cursor:"pointer",
                    backgroundColor:"rgb(11, 11, 11)",
                }}
                 fullWidth variant='outlined' size="medium">View Club</Button>
            </Box>
            </Card>
            </Grid>
            <Grid item xs={3}>
            <Card sx={{
                ":hover":{
                    transform: "scale(1.1)"
                },
                transition: "all .2s ease-in-out",
                borderRadius:"0.5rem",
                backgroundColor:"rgb(11, 11, 11)",
                border:"1px solid rgb(226, 226, 228,1)",
                 maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="240"
                image={"/images/test.jpeg"}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom sx={{color:"white"}} variant="h5" component="div">
                Lazy Group
                </Typography>
                <Typography gutterBottom sx={{color:"white"}} variant="body2" >
                Subscribe for 0.3ETH
                </Typography>
                <Typography sx={{color:"white"}} variant="body2" >
                6 Members
                </Typography>
            </CardContent>
            <Box
             sx={{
                 p:2,
                display:"flex",
                flexDirection:"column"
            }}>
            
                <Button
                sx={{
                    mb:3,
                    textTransform:"none",
                    cursor:"pointer",
                    backgroundColor:"rgb(11, 11, 11)",
                }}
                 fullWidth variant='outlined' size="medium">View Club</Button>
            </Box>
            
            </Card>
            </Grid>

          </Grid>
       

      </Box>
      
    </Layout>
    </>
  )
}

export default Clubs
