import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import React from 'react'

// Options Needs to be in this form
// [{value: 'value', label: 'label'}]

// Value Needs to be in this form
// 'value' or null
const SelectCustom = props => {
  const { options, value, name, onChange, extraOption, label, style } = props
  return (
    <FormControl size='small' sx={{ width: 200, ...style }}>
      <InputLabel sx={{ background: 'white' }} id='demo-simple-select-label'>
        {label}
      </InputLabel>
      <Select
        name={name}
        value={value}
        sx={{ width: '200px' }}
        onChange={onChange}
      >
        {extraOption && (
          <MenuItem key={extraOption.value} value={extraOption.value}>
            {extraOption.label}
          </MenuItem>
        )}
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectCustom
