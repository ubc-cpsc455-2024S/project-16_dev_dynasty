import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import React, { useState } from 'react'

const colors = {
  header: 'rgba(37,55,70,0.9)',
  headerSecondary: '#c8cDD0',
  chipBackground: '#EEEEEE',
  chipText: '#89929A',
  borderColor: '#e0e0e0',
  backgroundColor: '#ffffff',
}

enum TabNames {
  Setup = 'Setup',
  AlertDetails = 'Alert Details',
  AlgorithmConfiguration = 'Algorithm Configuration',
}

const FixedFooter = styled('div')({
  borderTop: `1px solid ${colors.borderColor}`,
  position: 'fixed',
  left: 0,
  bottom: 0,
  height: '70px',
  width: '100%',
  zIndex: 2, // Keeps the footer above other content
  backgroundColor: colors.backgroundColor,
})

const AdditionalScroll = styled('div')({
  height: '70px',
})

const TestPage = () => {
  const [currentTab, setCurrentTab] = useState<TabNames>(TabNames.Setup)
  return (
    <>
      <Box>
        <Tabs
          value={currentTab}
          onChange={(e: any, newTab: TabNames) => setCurrentTab(newTab)}
        >
          <Tab label={TabNames.Setup} value={TabNames.Setup} />
          <Tab label={TabNames.AlertDetails} value={TabNames.AlertDetails} />
          <Tab
            label={TabNames.AlgorithmConfiguration}
            value={TabNames.AlgorithmConfiguration}
          />
        </Tabs>
      </Box>
      <Box sx={{ paddingTop: '20px' }}>
        {currentTab === TabNames.Setup && <SetupTab />}
        {currentTab === TabNames.AlertDetails && <AlertDetailsTab />}
        {currentTab === TabNames.AlgorithmConfiguration && (
          <AlgorithmConfigurationTab />
        )}
      </Box>
      <FixedFooter>
        <Box display='flex' justifyContent='flex-end' gap={'10px'} p={2}>
          <Button color={'inherit'} variant={'contained'}>
            Cancel
          </Button>
          <Button color={'primary'} variant='contained'>
            Save & Close
          </Button>
        </Box>
      </FixedFooter>
    </>
  )
}

const SetupTab = () => {
  return (
    <Box display='flex' flexDirection={'column'} gap={'10px'}>
      <Typography sx={{ fontSize: 20 }}>General</Typography>
      <Box display='flex' gap={'30px'}>
        <SwitchWithLabel label={'Status'} />
        <SwitchWithLabel label={'AHM Integration'} />
      </Box>
      <TextFieldWithLabel label={'Name'} />
      <TextFieldWithLabel label={'Description'} />
      <ScheduledRunTime />
      <AircraftSelection
        aircrafts={['Aircraft 1', 'Aircraft 2', 'Aircraft 3']}
        handleSetAircrafts={() => {}}
      />
      <Typography sx={{ fontSize: 20 }}>Notifications</Typography>
      <CheckboxWithLabel label={'Send Notifications'} />
      <SelectWithDisplayedChips
        label={'Users'}
        data={['User 1', 'User 2', 'User 3']}
        setData={() => {}}
      />
      <SelectWithDisplayedChips
        label={'Roles'}
        data={['Role 1', 'Role 2', 'Role 3']}
        setData={() => {}}
      />
      <AdditionalScroll />
    </Box>
  )
}

const AlertDetailsTab = () => {
  return (
    <Box display='flex' flexDirection={'column'} gap={'10px'}>
      <Typography
        sx={{
          fontSize: 14,
          color: colors.header,
          fontWeight: '400',
          paddingBottom: '10px',
        }}
      >
        Specify the details when an alert is triggered by this algorigthm
      </Typography>
      <SelectCustom1 label={'Severity'} />
      <SelectCustom1 label={'Urgency'} />
      <SelectCustom1 label={'Alert Category'} />
      <TextFieldMultilineWithLabel label={'Description'} />
      <TextFieldMultilineWithLabel label={'Maintenance Message'} />
      <TextFieldMultilineWithLabel label={'Flight Deck Effort'} />
      <TextFieldMultilineWithLabel label={'Flight Deck Effects'} />
      <TextFieldMultilineWithLabel label={'Recommended Action'} />
      <TextFieldWithLabel label={'Author'} />
      <TextFieldWithLabel label={'Organization'} />
      <AdditionalScroll />
    </Box>
  )
}

const AlgorithmConfigurationTab = () => {
  return (
    <Box display='flex' flexDirection={'column'} gap={'10px'}>
      <TextDescription label={'Degraded Period'} value={'45 days'} />
      <TextDescription label={'Healthy Period'} value={'90 days'} />
      <TextDescription label={'Group By'} value={'Tail'} />
      <TextDescription label={'Take Absolute Value'} value={'Disabled'} />
      <TextDescription
        label={'Threshold Type'}
        value={'Consecutive Data Points (10)'}
      />
      <TextDescription label={'Threshold Condition'} value={'1.2'} />
      <TextDescription
        label={'Feature Value vs Threshold'}
        value={'Less Than or equal'}
      />
      <Button variant='contained' sx={{ width: '200px' }}>
        RETUNE ALGORITHM
      </Button>
    </Box>
  )
}

const TextDescription = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <>
      <Box display='flex'>
        <Box sx={{ width: '270px' }}>
          <TypographySecondary>{label}</TypographySecondary>
        </Box>
        <Typography sx={{ color: colors.header }}>{value}</Typography>
      </Box>
    </>
  )
}

interface SwitchWithLabelProps {
  label: string
}

const ScheduledRunTime = () => {
  const [isDayOfWeekVisible, setIsDayOfWeekVisible] = useState(true)
  const [isDayOfMonthVisible, setIsDayOfMonthVisible] = useState(true)

  return (
    <>
      <TypographySecondary sx={{ fontSize: 14, color: colors.headerSecondary }}>
        Scheduled Run Time
      </TypographySecondary>
      <Box display='flex'>
        <RadioWithLabel label='Day Of Week' />
        <CheckboxWithLabel label='Monday' />
        <CheckboxWithLabel label='Tuesday' />
        <CheckboxWithLabel label='Wednesday' />
        <CheckboxWithLabel label='Thursday' />
        <CheckboxWithLabel label='Friday' />
        <CheckboxWithLabel label='Saturday' />
      </Box>
      <Box display='flex' alignItems={'center'}>
        <RadioWithLabel label='Day Of Month' />
        <TextField size={'small'} hiddenLabel sx={{ width: 220 }} />
        <Typography
          sx={{
            fontSize: 14,
            color: colors.headerSecondary,
            paddingLeft: '5px',
          }}
        >
          Seperate days with comma, or use a dash for range Ex. 1, 4, 5-8
        </Typography>
      </Box>
    </>
  )
}

interface AircraftSelectionProps {
  aircrafts: string[]
  handleSetAircrafts: (aircrafts: string[]) => void
}

const AircraftSelection = ({
  aircrafts,
  handleSetAircrafts,
}: AircraftSelectionProps) => {
  const handleDelete = () => {
    handleSetAircrafts(aircrafts.filter((aircraft: string) => aircraft !== ''))
  }

  return (
    <>
      <Typography sx={{ fontSize: 14 }}>Aircraft Selection</Typography>
      <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
        {aircrafts.map((aircraft: string) => (
          <Chip
            sx={{ background: colors.chipBackground, color: colors.chipText }}
            label={aircraft}
            onDelete={handleDelete}
          />
        ))}
      </Box>
      <TextField hiddenLabel sx={{ width: 330 }} />
    </>
  )
}

// Components
const SwitchWithLabel = ({ label }: SwitchWithLabelProps) => {
  return (
    <FormControlLabel
      sx={{ fontSize: '14px', color: colors.headerSecondary, margin: 0 }}
      control={<Switch color='primary' />}
      label={label}
      labelPlacement='start'
    />
  )
}

interface TextFieldWithLabelProps {
  label: string
}

const TextFieldWithLabel = ({ label }: TextFieldWithLabelProps) => {
  return (
    <>
      <TypographySecondary>{label}</TypographySecondary>
      <TextField size={'small'} hiddenLabel sx={{ width: 330 }} />
    </>
  )
}

const TextFieldMultilineWithLabel = ({ label }: TextFieldWithLabelProps) => {
  return (
    <>
      <TypographySecondary>{label}</TypographySecondary>
      <TextField
        size={'small'}
        hiddenLabel
        multiline
        rows={2}
        sx={{ width: 600 }}
      />
    </>
  )
}

interface CheckboxWithLabelProps {
  label: string
  checked: boolean
  handleChecked: (checked: boolean) => void
}

const CheckboxWithLabel = ({
  label,
  checked,
  handleChecked,
}: CheckboxWithLabelProps) => {
  return (
    <FormControlLabel
      labelPlacement='end'
      label={<TypographySecondary>{label}</TypographySecondary>}
      control={
        <Checkbox
          checked={checked}
          onChange={(e: any) => handleChecked(e.target.value)}
        />
      }
    />
  )
}

interface RadioWithLabelProps {
  label: string
  checked: boolean
  handleChecked: (checked: boolean) => void
}

const RadioWithLabel = ({
  label,
  checked,
  handleChecked,
}: RadioWithLabelProps) => {
  return (
    <FormControlLabel
      labelPlacement='end'
      label={label}
      control={
        <Radio
          checked={checked}
          onChange={(e: any) => handleChecked(e.target.value)}
        />
      }
    />
  )
}

interface SelectWithDisplayedChipsProps {
  label: string
  data: any
  setData: (data: any) => void
}

const SelectWithDisplayedChips = ({
  label,
  data,
  setData,
}: SelectWithDisplayedChipsProps) => {
  const handleDelete = () => {
    setData(data.filter((item: any) => item !== ''))
  }

  return (
    <>
      <TypographySecondary>{label}</TypographySecondary>
      <Box display={'flex'}>
        <Select
          sx={{ width: '200px', marginRight: '10px' }}
          size={'small'}
          label='Age'
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Box display={'flex'} flexWrap={'wrap'} gap={'10px'}>
          {data.map((item: any) => (
            <Chip
              sx={{ background: colors.chipBackground, color: colors.chipText }}
              label={item}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      </Box>
    </>
  )
}

const SelectCustom1 = ({
  label,
  data,
  setData,
}: SelectWithDisplayedChipsProps) => {
  return (
    <>
      <TypographySecondary sx={{ paddingLeft: '10px' }}>
        {label}
      </TypographySecondary>
      <Select sx={{ width: '200px' }} size={'small'} label='Age'>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </>
  )
}

// Components Typography
const TypographySecondary = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.headerSecondary};
  padding-left: 5px;
`

export default TestPage
