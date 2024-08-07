import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  FormLabel,
} from '@mui/material'
import { getEventLogsAsync } from '../redux/logs/thunkLog'
import { styled } from '@mui/system'
import { colors } from '../styles/colors'
import TextFieldLabelWrapper from '../components/labels/TextFieldLabelWrapper'
import AdornmentSearch from '../components/inputs/adornments/AdornmentSearch'

const EventLogPage = () => {
  const eventLogs = useSelector(state => state.logs.eventLogs)
  const status = useSelector(state => state.logs.status)
  const error = useSelector(state => state.logs.error)
  const dispatch = useDispatch()

  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [type, setType] = useState('')
  const [bay, setBay] = useState('')
  const [npl, setNpl] = useState('')
  const [model, setModel] = useState('')

  useEffect(() => {
    dispatch(getEventLogsAsync())
  }, [])

  const handleYearChange = event => {
    setYear(event.target.value)
  }

  const handleMonthChange = event => {
    setMonth(event.target.value)
  }

  const handleBayChange = event => {
    setBay(event.target.value)
  }

  const handleTypeChange = event => {
    setType(event.target.value)
  }

  const handleNplChange = event => {
    setNpl(event.target.value)
  }

  const handleModelChange = event => {
    setModel(event.target.value)
  }

  const handleResetFilters = () => {
    setYear('')
    setMonth('')
    setType('')
    setBay('')
    setModel('')
    setNpl('')
  }

  const filteredLogs = eventLogs.filter(log => {
    const logDate = new Date(log.eventTime)
    const logYear = logDate.getFullYear()
    const logMonth = logDate.getMonth() + 1

    return (
      (!year || logYear === parseInt(year)) &&
      (!month || logMonth === parseInt(month)) &&
      (!type || log.eventType.toLowerCase().includes(type.toLowerCase())) &&
      (!bay || log.logContent.toLowerCase().includes(bay.toLowerCase())) &&
      (!npl || log.logContent.toLowerCase().includes(npl.toLowerCase())) &&
      (!model || log.logContent.toLowerCase().includes(model.toLowerCase()))
    )
  })

  const ErrorText = styled(Typography)({
    color: colors.errorTextColor,
    textAlign: 'center',
  })
  const LoadingContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
  })

  const TimeTypography = styled(Typography)({
    flex: '0 0 20%', // 15% width
  })

  const TypeTypography = styled(Typography)({
    flex: '0 0 15%', // 15% width
    textAlign: 'right',
  })

  const ContentTypography = styled(Typography)({
    flex: '0 0 65%', // 70% width
  })

  const LogContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    background: '#272626cb',
    borderBottom: '1px solid #ccc',
  })

  const LogsBox = styled(Box)({
    maxHeight: '75vh',
    // minHeight: '30vh',
    overflow: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  })

  const HeaderContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    background: '#171717',
    borderBottom: '1px solid #ccc',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  })

  // const FilterContainer = styled(Box)({
  //   marginTop: '24px',
  //   marginBottom: '16px',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // })

  const TotalLogsContainer = styled(Box)({
    textAlign: 'center',
  })

  return (
    <Navbar>
      <Header1 title={'Event Logs'} />
      <Container>
        <br />
        <FormLabel variant='h6'>Log count: {filteredLogs.length}</FormLabel>
        <br />
        <br />

        <Box
          sx={{
            marginTop: '24px',
            marginBottom: '16px',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-end',
          }}
        >
          <TextFieldLabelWrapper label={'Year'}>
            <Select
              size='small'
              value={year}
              onChange={handleYearChange}
              displayEmpty
            >
              <MenuItem value=''>
                <em>All Years</em>
              </MenuItem>
              {[2022, 2023, 2024].map(y => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </TextFieldLabelWrapper>
          <TextFieldLabelWrapper label={'Month'}>
            <Select
              sx={{ width: '200px' }}
              size='small'
              value={month}
              onChange={handleMonthChange}
              displayEmpty
            >
              <MenuItem value=''>
                <em>All Months</em>
              </MenuItem>
              {[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ].map((monthAbbr, index) => (
                <MenuItem key={monthAbbr} value={index + 1}>
                  {monthAbbr}
                </MenuItem>
              ))}
            </Select>
          </TextFieldLabelWrapper>
          <TextFieldLabelWrapper label={'Bays'}>
            <Select
              sx={{ width: '200px' }}
              size='small'
              value={bay}
              onChange={handleBayChange}
              displayEmpty
            >
              <MenuItem value=''>
                <em>All Bays</em>
              </MenuItem>
              {[
                'Bay 1 ',
                'Bay 2 ',
                'Bay 3',
                'Bay 4',
                'Bay 5',
                'Bay 6',
                'Bay 7',
                'Bay 8',
                'Bay 9',
                'Bay 10',
                'Bay 11',
                'Bay 12',
                'Bay 13',
                'Bay 14',
                'Bay 15',
                'Bay 16',
                'Bay 17',
                'Bay 18',
                'Bay 19',
                'Bay 20',
                'Bay 8.5',
                'Bay 13a',
                'Bay 13b',
                'Bay 14.5',
                'Bay 15.5',
                'Bay 16.5',
                'Bay 17.5',
                'Bay 18.5',
                'Bay 19.5',
                'Bay 20.5',
              ].map(b => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </TextFieldLabelWrapper>
          <TextFieldLabelWrapper label='House NPL#'>
            <TextField
              id='npl'
              value={npl}
              onChange={handleNplChange}
              variant='outlined'
              size='small'
              InputProps={AdornmentSearch}
            />
          </TextFieldLabelWrapper>
          <TextFieldLabelWrapper label='House Model'>
            <TextField
              id='model'
              size='small'
              value={model}
              onChange={handleModelChange}
              variant='outlined'
              label='Model'
            />
          </TextFieldLabelWrapper>
          <TextFieldLabelWrapper label='Event Type'>
            <Select
              sx={{ width: '200px' }}
              size='small'
              value={type}
              onChange={handleTypeChange}
              displayEmpty
            >
              <MenuItem value=''>
                <em>All Types</em>
              </MenuItem>
              {[
                'New customer',
                'New house',
                'House started',
                'House completed',
                'Bay work begin',
                'Bay work complete',
                'Bay work',
                'Defect created',
                'Defect fixed',
              ].map(t => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </TextFieldLabelWrapper>

          <Button
            color={'secondary'}
            variant={'outlined'}
            onClick={handleResetFilters}
          >
            Clear
          </Button>
        </Box>
        <LogsBox mt={3}>
          <HeaderContainer>
            <TimeTypography variant='h6'>Event Time</TimeTypography>
            <ContentTypography variant='h6'>Log Content</ContentTypography>
            <TypeTypography variant='h6'>Event Type</TypeTypography>
          </HeaderContainer>
          {status === 'pending' ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : error ? (
            <ErrorText>Error: {error}</ErrorText>
          ) : (
            filteredLogs.map((log, index) => (
              <LogContainer key={index}>
                <TimeTypography variant='body1'>{log.eventTime}</TimeTypography>
                <ContentTypography variant='body1'>
                  {log.logContent}
                </ContentTypography>
                <TypeTypography variant='body1'>{log.eventType}</TypeTypography>
              </LogContainer>
            ))
          )}
        </LogsBox>
      </Container>
      <br />
      <br />
      <br />
    </Navbar>
  )
}

export default EventLogPage
