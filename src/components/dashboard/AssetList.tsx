import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material'

function AssetList() {
  const [collectibles, setCollectibles] = React.useState([])

  React.useEffect(() => {
    handleFetchCollectible()
  }, [])

  async function handleFetchCollectible() {
    const res = await fetch(
      'https://api.modulenft.xyz/api/v1/opensea/collection/rankings?sort_by=SEVEN_DAY_VOLUME&count=100&offset=0'
    )
    const json = await res.json()
    setCollectibles(json.rankings)
  }
  return (
    <>
      <Grid container spacing={2}>
        {collectibles?.map((data: any, index: any) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                background: '#000000',
                border: '1px solid #959ca7',
                height: '20rem',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={data?.logo_url}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    sx={{ color: 'white', textAlign: 'left' }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {data?.collection_name}
                  </Typography>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '90%',
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: 'left',
                        mt: 4,
                        color: '#959ca7',
                      }}
                      variant="body2"
                    >
                      Floor Price
                    </Typography>
                    <Typography
                      sx={{
                        color: 'white',
                        textAlign: 'left',
                        mt: 1,
                      }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {data?.statistics?.floor} ETH
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default AssetList
