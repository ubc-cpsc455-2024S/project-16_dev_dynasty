// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Navbar from '../components/navigation/Navbar'
// import Header1 from '../components/headers/Header1'
// import { Box, CircularProgress, Container, Typography } from '@mui/material'
// import { getEventLogsAsync } from '../redux/logs/thunkLog'
// import { styled } from '@mui/system'
// import { colors } from '../styles/colors'

// const EventLogPage = () => {
//   const eventLogs = useSelector(state => state.logs.eventLogs)
//   const status = useSelector(state => state.logs.status)
//   const error = useSelector(state => state.logs.error)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(getEventLogsAsync())
//   }, [dispatch])

//   const ErrorText = styled(Typography)({
//     color: colors.errorTextColor,
//     textAlign: 'center',
//   })
//   const LoadingContainer = styled(Box)({
//     display: 'flex',
//     justifyContent: 'center',
//   })

//   const TimeTypography = styled(Typography)({
//     flex: '0 0 15%', // 15% width
//   })

//   const TypeTypography = styled(Typography)({
//     flex: '0 0 15%', // 15% width
//   })

//   const ContentTypography = styled(Typography)({
//     flex: '0 0 70%', // 70% width
//   })

//   const LogContainer = styled(Box)({
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '8px 16px',
//     background: "#616161",
//     borderBottom: '1px solid #ccc',
//   })

//   const LogsBox = styled(Box)({
//     maxHeight: '75vh',
//     // width: '80vw',
//     overflow: 'auto',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     '&::-webkit-scrollbar': {
//       width: '10px',
//     },
//     '&::-webkit-scrollbar-thumb': {
//       background: '#888',
//       borderRadius: '10px',
//     },
//     '&::-webkit-scrollbar-thumb:hover': {
//       background: '#555',
//     },
//   })

//   const HeaderContainer = styled(Box)({
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '8px 16px',
//     background: "#9e9e9e",
//     borderBottom: '1px solid #ccc',
//     position: 'sticky',
//     top: 0,
//     zIndex: 1,
//   })

//   return (
//     <Navbar>
//       <Container>
//         <Header1 title={'Event Logs'} />
//         <LogsBox mt={3}>
//           <HeaderContainer>
//             <TimeTypography variant="h6">Event Time</TimeTypography>
//             <ContentTypography variant="h6">Log Content</ContentTypography>
//             <TypeTypography variant="h6">Event Type</TypeTypography>
//           </HeaderContainer>
//           {status === 'pending' ? (
//             <LoadingContainer>
//               <CircularProgress />
//             </LoadingContainer>
//           ) : error ? (
//             <ErrorText>Error: {error}</ErrorText>
//           ) : (
//             eventLogs.map((log, index) => (
//               <LogContainer key={index}>
//                 <TimeTypography variant="body1">{log.time}</TimeTypography>
//                 <ContentTypography variant="body1">{log.content}</ContentTypography>
//                 <TypeTypography variant="body1">{log.type}</TypeTypography>
//               </LogContainer>
//             ))
//           )}
//         </LogsBox>
//       </Container>
//     </Navbar>
//   )
// }

// export default EventLogPage

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
} from '@mui/material'
import { getEventLogsAsync } from '../redux/logs/thunkLog'
import { styled } from '@mui/system'
import { colors } from '../styles/colors'

const EventLogPage = () => {
  const eventLogs = useSelector(state => state.logs.eventLogs)
  const status = useSelector(state => state.logs.status)
  const error = useSelector(state => state.logs.error)
  const dispatch = useDispatch()

  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    dispatch(getEventLogsAsync())
  }, [dispatch])

  const handleYearChange = event => {
    setYear(event.target.value)
  }

  const handleMonthChange = event => {
    setMonth(event.target.value)
  }

  const handleTypeChange = event => {
    setType(event.target.value)
  }

  const handleResetFilters = () => {
    setYear('')
    setMonth('')
    setType('')
  }

  const filteredLogs = eventLogs.filter(log => {
    const logDate = new Date(log.time)
    const logYear = logDate.getFullYear()
    const logMonth = logDate.getMonth() + 1

    return (
      (!year || logYear === parseInt(year)) &&
      (!month || logMonth === parseInt(month)) &&
      (!type || log.type === type)
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
    background: '#616161',
    borderBottom: '1px solid #ccc',
  })

  const LogsBox = styled(Box)({
    maxHeight: '75vh',
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
    background: '#9e9e9e',
    borderBottom: '1px solid #ccc',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  })

  const FilterContainer = styled(Box)({
    marginTop: '24px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  })

  const TotalLogsContainer = styled(Box)({
    textAlign: 'center',
  })

  return (
    <Navbar>
      <Container>
        <Header1 title={'Event Logs'} />
        <FilterContainer>
          <Select value={year} onChange={handleYearChange} displayEmpty>
            <MenuItem value=''>
              <em>All Years</em>
            </MenuItem>
            {[2022, 2023, 2024].map(y => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
          <Select value={month} onChange={handleMonthChange} displayEmpty>
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
          <Select value={type} onChange={handleTypeChange} displayEmpty>
            <MenuItem value=''>
              <em>All Types</em>
            </MenuItem>
            {[
              'new customer',
              'new house',
              'house started',
              'house completed',
              'defect created',
              'defect fixed',
            ].map(t => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>

          <Button onClick={handleResetFilters}>Reset Filters</Button>
        </FilterContainer>
        <TotalLogsContainer>
          <Typography variant='h6'>
            Number of Logs: {filteredLogs.length}
          </Typography>
        </TotalLogsContainer>

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
                <TimeTypography variant='body1'>{log.time}</TimeTypography>
                <ContentTypography variant='body1'>
                  {log.content}
                </ContentTypography>
                <TypeTypography variant='body1'>{log.type}</TypeTypography>
              </LogContainer>
            ))
          )}
        </LogsBox>
      </Container>
    </Navbar>
  )
}

export default EventLogPage
