import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import React from 'react'

// Options Needs to be in this form
// [{value: 'value', label: 'label'}]

// Value Needs to be in this form
// 'value' or null
const SelectCustom = props => {
  const {
    options,
    value,
    name,
    onChange,
    extraOption,
    label,
    style,
    width = '200px',
  } = props
  return (
    <FormControl
      variant={'outlined'}
      size='small'
      sx={{ width: 200, ...style }}
    >
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        label={label}
        sx={{ width: width }}
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
