import * as React from 'react';
import type { NextPage } from 'next'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Layout from '../componets/Layout'
import styles from '../styles/Home.module.css'
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { Grid, TextField, Typography } from '@mui/material';
import Modal from "@mui/material/Modal";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Image from 'next/image';
import Factory from "../abi/Factory.json"
import Web3Modal from "web3modal"
import { toTimestamp } from '../componets/utils/util';
import { ethers } from "ethers";
import { useRouter } from "next/router";

import { LargeNumberLike } from 'crypto';
import { Container } from 'reactstrap';


import {
  FactoryAddress
} from '../config';
import Link from 'next/link';



function Home({tokens}:{
  tokens : any;
}){

  type tokenValues = {
    symbol:string,
    address: string,
    logoURI: string
  }
const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [group, setGroup] = React.useState(false);
  const [botSetup, setBotsetup] = React.useState(false);
  const [userAddress, setWalletAddress] = React.useState("")
  const [botId, setBotId] = React.useState("")
  const [newGroupDetails, setNewGroupDetails] = React.useState([])
  const [firstStep, setFirstStep] = React.useState(true);
  const [secondStep, setSecondStep] = React.useState(false);
  const [thirdStep, setThirdStep] = React.useState(false);
  const [fourthStep, setFourthStep] = React.useState(false);
  const [depositDate, setDepositDate] = React.useState(null);
  const [successModal, setSuccessModal] = React.useState(false);
  const [botModal, setBotModal] = React.useState(false);
  const [currentToken, setCurrentToken] = React.useState(tokens[0]?.address);
  const [openDate, setOpenDate] = React.useState(false);
  const [currentTokenDetails, setCurrentTOkenDetails] = React.useState<tokenValues>({
    symbol:"",
    address: "",
    logoURI: ""
  });
  const successModalClose = () => {
    setSuccessModal(false);
  };
  const botModalClose = () => {
    setBotModal(false);
  };
  type FormValues = {
    groupName: string;
    groupSymbol:string;
    address:string;
    depositLimit: string;
    depositEndDate: string;
    maxnumber: number;
  }
  const {register, handleSubmit, getValues, formState:{ dirtyFields}, reset} = useForm<FormValues>({
    defaultValues :{
      groupName: "",
      groupSymbol: ""
    }
  })
  
  const showSecondStep = () => {
    setFirstStep(false);
    setSecondStep(true);
    setThirdStep(false);
    setFourthStep(false);

  }

  const showThirdStep = () => {
    setFirstStep(false);
    setSecondStep(false);
    setThirdStep(true);
    setFourthStep(false);

  }

  const showFourthStep = () => {
    setFirstStep(false);
    setSecondStep(false);
    setThirdStep(false);
    setFourthStep(true);
  }
  const showFirstStep = () => {
    setFirstStep(true);
    setSecondStep(false);
    setThirdStep(false);
    setFourthStep(false);

  }
  React.useEffect(() => {
    if (router.isReady) {
      console.log('reactor', router.query)
      const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
      if(groupDetails !== ''){
        checkIfGroupIsActivated();

      }

  
    }
  }, [router.isReady, router.query, router.pathname]);


  const checkIfGroupIsActivated = async () => {
    const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
      const currentGroupAddress: any = groupDetails?.args[0]
      console.log("groupDetails", groupDetails)
      const data = {
        groupAddress: currentGroupAddress
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
      const response = await fetch(`http://207.154.202.18:3000/bot`, requestOptions);
      const jsonData = await response.json();
      if(jsonData.status === "Activated"){
        router.push({
          pathname: "/dashboard",
        });
      }else{
        return
      }
  }

  React.useEffect(() => {
    if (router.isReady) {
      console.log('reactor', router.query)
      const query = router.query;
      if (query.bot == "true") {
         setBotsetup(true);
      }else{
        return
      }
    }
  }, [router.isReady, router.query, router.pathname]);

  React.useEffect(()=> {
    tokens.forEach((element: any) => {
      console.log("tokenss", tokens)
        if(element.address === currentToken){
          setCurrentTOkenDetails(element)
          console.log("current token details", element)
        }
    })

  },[currentToken])
  const handleChangeToken = (event: any) =>{
    console.log("tokenss", tokens)

    setCurrentToken(event.target.value)
  
  }
  const onSubmit = async (data: any) =>{
    console.log("data", data);
    const address: any = [];

    const botAddress = "0xac9122168d18e28Ef181406533583A3486D9FA4B";
      if(localStorage.getItem("account")){
        const existingUser: any = localStorage.getItem("account")
    console.log("address user", existingUser)
    address.push(existingUser);


        setWalletAddress(existingUser);
    console.log("address user", userAddress)

      } else {
        return
      }
    address.push(botAddress);
    console.log("address array", address)
    // console.log("data",data)
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // };

    // const response = await fetch(`https://dispay.herokuapp.com/clubs`, requestOptions);
    // const jsonData = await response.json();
    setLoading(true);
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner()
    let contract = new ethers.Contract(FactoryAddress,Factory.abi,signer)
    const depositLimit = ethers.utils.parseUnits(data.depositLimit.toString(),'ether')
    const newDepositDate = toTimestamp(data?.depositEndDate);
    console.log("mewDate", newDepositDate);
    const tx = await contract.createGroup(
      address,
      data?.groupName,
      data?.groupSymbol,
      data?.address,
      newDepositDate,
      depositLimit,
      data?.maxnumber

    )

    console.log("done");

    let receipt = await tx.wait();
    receipt.events?.filter((group: any) => {     
          
      if(group.event == "NewGroup"){
        setNewGroupDetails(group);
        localStorage.setItem("groupAddress", JSON.stringify(group));
        setSuccessModal(true);
        reset();
        setGroup(false)
        setLoading(false);

      } ;   
     }) 

    console.log("done receipt", receipt);
    console.log( "newgrouplog",
       receipt.events?.filter((x: any) => {     
          
        return x.event == "NewGroup";    })  );

    
  }

  const createBot = async () => {
    setLoading(true);
    const groupDetails: any = JSON.parse(localStorage.getItem("groupAddress") || '{}');
    // console.log("newGroup", newGroupDetails)
    const args: any = groupDetails?.args[0]
    const data = {
      groupAddress: args
    }
       const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
       const response = await fetch(`http://207.154.202.18:3000/bot`, requestOptions);
      const jsonData = await response.json();
      if(jsonData){
        setLoading(false);
        setBotId(jsonData?._id)
        setBotModal(true)
        setBotsetup(false);
      }

      // console.log("response to bot.",jsonData)


  }
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#242526",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
  };

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
           <Typography sx={{
             color:"white",
             textAlign:"center"
          }}>
              Group Created Successfully <br/>
              Please clck below to authorize group Bot
           </Typography>

          <Box sx={{
            mt:5,
            display: 'flex',
            justifyContent: "center"
          }}>
            <Link href={`https://discord.com/api/oauth2/authorize?client_id=974402155425431603&permissions=0&redirect_uri=http://localhost:3000/?bot=true&response_type=code&scope=bot%20identify`} passHref>
              <Typography
              sx={{
                cursor: "pointer",
                color:"white",
                fontSize:"16px"
              }}>
              Authorize Bot
              </Typography>
          
            </Link>
       
          </Box>
          

       </Box>
    </Modal>
    <Modal
        BackdropProps={{
        timeout: 500,
        }}
        closeAfterTransition
        onClose={botModalClose}
        open={botModal}
    >
       <Box sx={modalStyle}
       >
           <Typography sx={{
             color:"white",
             textAlign:"center"
          }}>
              Bot Created Successfully <br/>
              Please copy the message below and paste on your server to setup Bot
           </Typography>

           

          <Box sx={{
            mt:5,
            display: 'flex',
            justifyContent: "center"
          }}>
              <Typography
              sx={{
                cursor: "pointer",
                color:"white",
                fontSize:"16px"
              }}>
             !setup{botId}

              </Typography>
          
       
          </Box>
          

       </Box>
    </Modal>
    <Layout>
      {
        group ? (
          <>
        
            <Box sx={{p:5}}>
              <Grid
              container
              direction="row"
              justifyContent="Center"
              alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                <Typography
                variant='body1'
                sx={{
                  textAlign:"center",
                  color:"white"}}>
              CREATE A GROUP 
            </Typography>
                </Box>

              </Grid>
          </Box>
          <form
            style={{display:"flex", flexDirection:"column"}}
            onSubmit={handleSubmit(onSubmit)}>
              {
            firstStep && (
              <>
                <Box
                sx={{
                  maxWidth:"30rem",
                  display:"flex",
                  margin: "0 auto",
                  flexDirection:"column",
                  justifyContent:"center",
                  p:4
                }}>
                  <Container>
                
              <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>What should we call this group</Typography>

                  <TextField
                  fullWidth
                  sx={{
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
                {...register("groupName",
                {required:true}
                )}
                id="groupName" label="Name" variant="outlined" />
              <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>a.k.a</Typography>

                <TextField
                fullWidth
                sx={{
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
                {...register("groupSymbol",
                {required: true}
                )}
                id="groupSymbol" label="symbol" variant="outlined" />
                <Typography variant='subtitle2'
                  component="span" 
                  sx={{color:"#959ca7", textAlign:"left"}}>
                    Set an easily recognizable symbol for your group 
                    token that powers the group&apos;s cap table management and 
                    governance infrastructure. Members receive
                      this group token (initially defaults to
                      non-transferable) as proof of their deposit</Typography>
                  {/* <TextField sx={{
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
                id="monthlySubscriptionPrice" label="Monthly Subscription" variant="outlined" /> */}
                <Box sx={{
                  display:"flex",
                  justifyContent:"flex-end"
                }}>
                <Button 
                onClick={
                  showSecondStep
                }
                      sx={{
                          my:2,
                          backgroundColor:"white",
                          color:"black",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                      disabled={!dirtyFields?.groupName}
                      
                      variant='contained' size="medium">Next</Button>
                </Box>

                  </Container>
              
          
                </Box>
              </>
            )
          }
           {
            secondStep && (
              <>
                <Box
                 sx={{
                  maxWidth:"30rem",
                  display:"flex",
                  margin: "0 auto",
                  flexDirection:"column",
                  justifyContent:"center",
                  p:4
                }}>
              <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", textAlign:"left"}}>What should we call this group?</Typography>
              <Typography variant='subtitle1' sx={{color:"white",mr:3, textAlign:"left"}}>
                  {getValues("groupName")}
              <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", mx:3, textAlign:"left"}}>Group Token :{getValues("groupSymbol")}</Typography>

              </Typography>
              <Typography variant='h6' sx={{color:"white",mt:5, textAlign:"left"}}>What’s the upper limit of the group raise?</Typography>
              <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", my:3, textAlign:"left"}}>Accepting deposits beyond this amount will require an on-chain transaction with gas, so aim high.</Typography>
              <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>Raise in</Typography>


                <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                select
                defaultValue={currentToken}
                sx={{
                input: { color: "white"},
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "& svg": {
                    color: "white"
                  },
                  "&:hover fieldset": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiSelect-select": {
                    color: 'white',
                  },
                },
                my:2}}
                {...register("address",
                {required:true}
                )}
                variant="outlined">
                   {tokens?.map((token: any, index: any) => (
                      <MenuItem
                      onClick={()=> {
                        setCurrentToken(token?.address)
                      }}
                       key={index} 
                       value={token?.address}>
                      <img alt="logo" style={{marginRight:"10px"}} src={token?.logoURI}></img>
                      {token?.name} <span style={{marginLeft:"13px"}}>{token?.symbol}</span>
                      </MenuItem>
                    ))}
                </TextField>
              <Typography variant='body1' sx={{color:"white", mt:3, textAlign:"left"}}>Upper limit</Typography>

                <TextField
                fullWidth
                sx={{
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
                {...register("depositLimit",
                {required: true}
                )}
                type="number"
                id="depositLimit" label="Upper limit" variant="outlined" />
                </Box>
                <Box sx={{
                  display:"flex",
                  justifyContent:"space-around"
                }}>
                  <Button 
                  startIcon={
                    <KeyboardBackspaceIcon
                    sx={{
                      color:"white",
                    }}/>
                  }
                onClick={
                  showFirstStep
                }
                      sx={{
                          my:2,
                          
                          color:"white",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                     
                      
                      variant='text' size="medium">Back</Button>
                <Button 
                onClick={
                  showThirdStep
                }
                      sx={{
                          my:2,
                          backgroundColor:"white",
                          color:"black",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                     
                      
                      variant='contained' size="medium">Next</Button>
                </Box>
              
              </>
            )
          }
           {
            thirdStep && (
              <>
                <Box
                 sx={{
                  maxWidth:"30rem",
                  display:"flex",
                  margin: "0 auto",
                  flexDirection:"column",
                  justifyContent:"center",
                  p:4
                }}>
              <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", textAlign:"left"}}>What should we call this group?</Typography>
              <Typography variant='subtitle1' sx={{color:"white",mr:3, textAlign:"left"}}>
                  {getValues("groupName")}
              <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", mx:3, textAlign:"left"}}>Group Token :{getValues("groupSymbol")}</Typography>

              </Typography>
              <Typography variant='subtitle2' sx={{color:"#959ca7",mt:5, textAlign:"left"}}>What’s the upper limit of the group raise?</Typography>
              <Typography variant="subtitle1"  sx={{color:"white", my:3, textAlign:"left"}}>{getValues("depositLimit")}
              <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", mx:3, textAlign:"left"}}>
              <img src={currentTokenDetails?.logoURI} alt={currentTokenDetails?.symbol} style={{marginRight:"10px"}} />
               
                {currentTokenDetails?.symbol} 
              </Typography>

              </Typography>
              <Typography variant='body1' sx={{color:"white", textAlign:"left"}}>When will deposits close?</Typography>

              <Typography component="span" variant='subtitle2' sx={{color:"#959ca7",mb:3, textAlign:"left"}}>
              Extending the close date will require an on-chain transaction with gas, 
              so aim for further in the future to leave ample time for collection.
               You can close deposits early if needed.
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              desktopModeMediaQuery=""
                              open={openDate}
                              onOpen={() => setOpenDate(true)}
                              allowSameDateSelection={true}
                              disablePast
                              label="Start Date"
                              views={["day"]}
                              value={depositDate || undefined}
                              onChange={(newValue: any) => {
                                setDepositDate(newValue);
                                setOpenDate(false);
                              }}
                              PopperProps={{
                                disablePortal: true,
                              }}
                              inputFormat="MMM d, Y"
                              InputAdornmentProps={{
                                position: "start",
                              }}
                              OpenPickerButtonProps={{ disableRipple: true }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  onClick={(e) => setOpenDate(true)}
                                  sx={{
                                    input: { color: "white"},
                                    label: { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                      "& fieldset": {
                                        borderColor:"white",
                                      },
                                      "&:hover fieldset": {
                                        borderColor: (theme) =>
                                          theme.palette.primary.main,
                                      },

                                      "& svg": {
                                        color: "white",
                                      },
                                      "&:hover button": {
                                        backgroundColor: "transparent",
                                      },
                                    },
                                  }}
                                  {...register("depositEndDate",
                                  {required:true}
                                  )}
                                  InputLabelProps={{ shrink: true }}
                                 
                                />
                              )}
                            />
                          </LocalizationProvider>

                </Box>
                <Box sx={{
                  display:"flex",
                  justifyContent:"space-around"
                }}>
                  <Button 
                  startIcon={
                    <KeyboardBackspaceIcon
                    sx={{
                      color:"white",
                    }}/>
                  }
                onClick={
                  showSecondStep
                }
                      sx={{
                          my:2,
                          
                          color:"white",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                     
                      
                      variant='text' size="medium">Back</Button>
                <Button 
                onClick={
                  showFourthStep
                }
                      sx={{
                          my:2,
                          backgroundColor:"white",
                          color:"black",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                     
                      
                      variant='contained' size="medium">Next</Button>
                </Box>
              </>
            )
          }
          {
            fourthStep && (
              <>
                <Box
                 sx={{
                  maxWidth:"30rem",
                  display:"flex",
                  margin: "0 auto",
                  flexDirection:"column",
                  justifyContent:"center",
                  p:4
                }}>
                  <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", textAlign:"left"}}>What should we call this group?</Typography>
                  <Typography variant='subtitle1' sx={{color:"white",mr:3, textAlign:"left"}}>
                      {getValues("groupName")}
                  <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", mx:3, textAlign:"left"}}>Group Token :{getValues("groupSymbol")}</Typography>

                  </Typography>
                  <Typography variant='subtitle2' sx={{color:"#959ca7",mt:5, textAlign:"left"}}>What’s the upper limit of the groups raise?</Typography>
                  <Typography variant="subtitle1"  sx={{color:"white", my:3, textAlign:"left"}}>{getValues("depositLimit")}
                  <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", mx:3, textAlign:"left"}}>
              <img src={currentTokenDetails?.logoURI} alt={currentTokenDetails?.symbol} style={{marginRight:"10px"}} />
               
                {currentTokenDetails?.symbol} 
              </Typography>


                  </Typography>
                  <Typography variant='subtitle2' sx={{color:"#959ca7",mt:5, textAlign:"left"}}>When will deposits close?</Typography>
                  <Typography variant='subtitle1' sx={{color:"white",mr:3, textAlign:"left"}}>
                      {getValues("depositEndDate")}</Typography>
                      <Typography variant='body1' sx={{color:"white", mt:3, textAlign:"left"}}>What’s the maximum number of members?</Typography>
                      <Typography component="span" variant='subtitle2' sx={{color:"#959ca7", textAlign:"left"}}>
                      Groups may have up to 99 members according to the SEC. Dyspay 
                      encourages all users to consult with their own legal and tax counsel.
                        </Typography>

                    <TextField
                    fullWidth
                    sx={{
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
                    my:3}} 
                    {...register("maxnumber",
                    {required: true}
                    )}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 99 } }}
                    id="maxnumber" label="Max Number" variant="outlined" />


              </Box>
                <Box sx={{
                  display:"flex",
                  justifyContent:"space-around"
                }}>
                  <Button 
                  startIcon={
                    <KeyboardBackspaceIcon
                    sx={{
                      color:"white",
                    }}/>
                  }
                onClick={
                  showThirdStep
                }
                      sx={{
                          my:2,
                          
                          color:"white",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                     
                      
                      variant='text' size="medium">Back</Button>
                <Button 
                  type='submit'
                      sx={{
                          my:2,
                          backgroundColor:"white",
                          color:"black",
                          borderRadius: "4px",
                          cursor:"pointer",
                          textTransform:"none"
                      }}
                     
                      
                      variant='contained' size="medium">Create Group</Button>
                </Box>
              </>
            )
          }
            </form>

        
      
           
          </>
        ) :(
          <>
          {
            botSetup ? (
              <>
                <div style={{
              display:"flex",
              flexDirection:"column",
              margin:"0 auto",
              justifyContent:"center"
              }}>
            
           <Typography sx={{
              mt:5,
             textAlign:"center",
             color:"#858992", fontSize:"14px"}}>
             Click on the link below to create Bot
            
           </Typography>
           <Box sx={{
             display:"flex",
             justifyContent:"center",
             mt:2
           }}>
           <Button 
            onClick={createBot}
            startIcon={
              <AddIcon sx={{color:"black"}}/>
            }
            sx={{
            my:2,
            borderRadius:"12px",
            backgroundColor:"#ffffff",
            color:"Black",
            fontSize:"16px",
            cursor:"pointer",
            textTransform:"none",
            width:"291px",
            height:"52px",
            ":hover": {
              backgroundColor:"#7d7d7d"
            }
            }}
             
            variant='contained' size="medium">Create Bot</Button>
           </Box>
          
            </div>
              </>
            ) : (
              <>
                <div style={{
              display:"flex",
              flexDirection:"column",
              margin:"0 auto",
              justifyContent:"center"
              }}>
            <Typography gutterBottom sx={{
              mt:5,
              textAlign:"center",
              fontSize:"22px",

               color:"white"}}>
             You are not in any group yet
            
           </Typography>
           <Typography sx={{
             textAlign:"center",
             color:"#858992", fontSize:"14px"}}>
             Create your group or join will appear here
            
           </Typography>
           <Box sx={{
             display:"flex",
             justifyContent:"center",
             mt:2
           }}>
           <Button 
            onClick={()=>{setGroup(true)}}
            startIcon={
              <AddIcon sx={{color:"black"}}/>
            }
            sx={{
            my:2,
            borderRadius:"12px",
            backgroundColor:"#ffffff",
            color:"Black",
            fontSize:"16px",
            cursor:"pointer",
            textTransform:"none",
            width:"291px",
            height:"52px",
            ":hover": {
              backgroundColor:"#7d7d7d"
            }
            }}
             
            variant='contained' size="medium">Create a Group</Button>
           </Box>
          
            </div>
              </>
            )
          }
          
          </>
        )
      }
    
      
    </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://api-polygon-tokens.polygon.technology/tokenlists/testnet.tokenlist.json')
  const json = await res.json()
  // console.log(JSON.stringify(json))
  return {
    props: {
      tokens: json.tokens,
    },
  }
}

export default Home
