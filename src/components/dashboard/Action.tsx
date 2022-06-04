import React, { useEffect, useState } from 'react'
import {
  MenuList,
  ListItemIcon,
  Paper,
  ListItemText,
  MenuItem,
} from '@mui/material'
import { IGroup } from '@/types/group'
import { tokenList, Itoken } from '@/services/utils/tokenList'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import SettingsIcon from '@mui/icons-material/Settings'

interface IDetails {
  group: IGroup
}
function Action({ group }: IDetails) {
  return (
    <>
      <Paper
        sx={{ width: '100%', p: 4, maxWidth: '100%', background: '#131416' }}
      >
        <MenuList>
          <MenuItem sx={{ p: 2 }}>
            <ListItemIcon>
              <WorkspacePremiumIcon sx={{ color: 'white' }} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              sx={{ color: 'white' }}
              primary="Create an off-chain legal entity"
            />
          </MenuItem>
          <MenuItem sx={{ p: 2 }}>
            <ListItemIcon>
              <BorderColorIcon sx={{ color: 'white' }} fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ color: 'white' }}>
              Sign legal agreements
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ p: 2 }}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: 'white' }} fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ color: 'white' }}>Modify settings</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  )
}

export default Action
