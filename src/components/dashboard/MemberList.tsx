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
import { getGroupMembers } from '@/services/api/group'

interface IMemberList {
  groupAddress: string
}
function MemberList({ groupAddress }: IMemberList) {
  const [members, setMembers] = React.useState([])

  React.useEffect(() => {
    handleFetchCollectible()
  }, [])

  async function handleFetchCollectible() {
    const { result } = await getGroupMembers(groupAddress)
    if (result) setMembers(result)
  }
  return (
    <>
      {members.length ? (
        <>
          {members?.map((data: any, index: any) => (
            <></>
          ))}
        </>
      ) : (
        <>
          <Typography
            variant="body1"
            sx={{ color: 'white', textAlign: 'left' }}
          >
            No members
          </Typography>
        </>
      )}
    </>
  )
}

export default MemberList
