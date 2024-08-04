import { FormLabel, Box } from '@mui/material'
import React from 'react'

interface TextFieldLabelWrapperProps {
  children: React.ReactNode | React.ReactNode[]
  label: string
  width?: string
}

const TextFieldLabelWrapper = ({
  children,
  label,
  width = '200px',
}: TextFieldLabelWrapperProps) => {
  return (
    <Box style={{ width: width }}>
      <FormLabel>{label}</FormLabel>
      <br />
      {children}
    </Box>
  )
}

export default TextFieldLabelWrapper
