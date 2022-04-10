import type { NextPage } from 'next'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../componets/Layout'
import styles from '../styles/Home.module.css'
import { Grid, TextField, Typography } from '@mui/material';

function Home(){
  return(
    <>
    <Layout>
      <Box sx={{p:5}}>
          <Grid
           container
           direction="row"
           justifyContent="Center"
           alignItems="center">
             <Box sx={{ flexGrow: 1 }}>
             <Typography
             variant='h3'
             sx={{color:"white"}}>
          Welcome to Dispay
        </Typography>
             </Box>

          </Grid>
       

      </Box>
      <Box sx={{p:4}}>
        <Typography variant='body1' sx={{color:"white"}}>Create Group</Typography>
      <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 2, sm: 2, md: 4 }}>
        <Grid item xs={4}>
         <TextField sx={{
            input: { color: "white"},
            label: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            },
           my:4}} id="group-name" label="Name" variant="outlined" />
        
        </Grid>

      </Grid>
      </Box>
      
    </Layout>
    </>
  )
}

export default Home
