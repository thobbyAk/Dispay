import * as React from 'react';
import type { NextPage } from 'next'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Layout from '../componets/Layout'
import styles from '../styles/Home.module.css'
import { useForm } from "react-hook-form";
import { Grid, TextField, Typography } from '@mui/material';
import Modal from "@mui/material/Modal";

import { LargeNumberLike } from 'crypto';

function Home(){
  const [successModal, setSuccessModal] = React.useState(false);
  const successModalClose = () => {
    setSuccessModal(false);
  };
  type FormValues ={
    name: string;
    description:string;
    monthlySubscriptionPrice: number;
  }
  const {register, handleSubmit, formState:{errors}} = useForm<FormValues>()
  
  const onSubmit = async (data: any) =>{

    console.log("data",data)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(`https://dispay.herokuapp.com/clubs`, requestOptions);
    const jsonData = await response.json();
    setSuccessModal(true);
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
  return(
    <>
     <Modal
        BackdropProps={{
        timeout: 500,
        }}
        closeAfterTransition
        onClose={successModalClose}
        open={successModal}
    >
       <Box sx={modalStyle}
       >
           <Typography sx={{color:"white"}}>
              Club Created Successfully
           </Typography>

       </Box>
    </Modal>
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
        <Typography variant='body1' sx={{color:"white"}}>Create Investment Club</Typography>
      <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 2, sm: 2, md: 4 }}>
        <Grid item xs={4}>
          
          <Box
          sx={{
            display:"flex",
            flexDirection:"column"
          }}>
            <form
            style={{display:"flex", flexDirection:"column"}}
             onSubmit={handleSubmit(onSubmit)}>
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
           my:2}}
           {...register("name",{required: true})}
           id="name" label="Name" variant="outlined" />
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
           my:2}} 
           {...register("description",{required: true})}
           id="description" label="Description" variant="outlined" />
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
           my:2}} type="number"
           {...register("monthlySubscriptionPrice",{required: true, valueAsNumber:true})}
           id="monthlySubscriptionPrice" label="Monthly Subscription" variant="outlined" />
          <Button 
            type="submit"
                sx={{
                    my:2,
                    backgroundColor:"#034082",
                    color:"white",
                    cursor:"pointer",
                    textTransform:"none"
                }}
                fullWidth 
                variant='contained' size="medium">Create Club</Button>
          </form>
     
          </Box>
         
          
        
        
        </Grid>

      </Grid>
      </Box>
      
    </Layout>
    </>
  )
}

export default Home
