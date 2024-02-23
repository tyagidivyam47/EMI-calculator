import { Box } from '@mui/material'
import React from 'react'
import { mainHeading } from '../../Theme'

const Settings = () => {
  return (
    <Box>
      <Box
        sx={{
          font: mainHeading,
          textAlign: "center",
          marginLeft: "100px",
          marginTop: "20px",
        }}
      >
        Settings
      </Box>
    </Box>
  )
}

export default Settings