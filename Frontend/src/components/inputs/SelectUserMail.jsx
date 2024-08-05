import React, { useState } from 'react'
import { Autocomplete, TextField, Chip } from '@mui/material'
import { useSelector } from 'react-redux'
import { styled } from '@mui/system'
import { MdClose } from 'react-icons/md'

const ChipContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '8px',
})

const SelectUserMail = ({ recipients, setRecipients }) => {
  const allUsers = useSelector(state => state.auth.allUsers)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddRecipient = (event, newValue) => {
    if (newValue && !recipients.includes(newValue.email)) {
      setRecipients([...recipients, newValue.email])
    }
  }

  const handleDeleteRecipient = (emailToDelete) => {
    setRecipients(recipients.filter(email => email !== emailToDelete))
  }

  return (
    <div>
      <Autocomplete
        options={allUsers}
        getOptionLabel={(option) => `${option.name} (${option.email})`}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (option) =>
              option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
              option.email.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Recipients"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
        onChange={handleAddRecipient}
      />

      <ChipContainer>
        {recipients.map((email) => (
          <Chip
            key={email}
            label={email}
            onDelete={() => handleDeleteRecipient(email)}
            deleteIcon={<MdClose />}
            color="primary"
            variant="outlined"
          />
        ))}
      </ChipContainer>
    </div>
  )
}

export default SelectUserMail
