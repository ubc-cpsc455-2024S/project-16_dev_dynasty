import React from 'react'
import './styles/legendExample.css'
import { Box, Typography } from '@mui/material'
import { ImArrowRight } from 'react-icons/im'

const LengendExample = () => {
  return (
    <div className='legend-example'>
      <div className='legend-container'>
        <div>
          <Typography className='legend-title'>Legend</Typography>
        </div>
        <div className='legend-content-container'>
          <div>
            <div class='legend-item'>
              <div class='legend-item-box status1'></div>
              <Typography className='legend-item-text'>Not Started</Typography>
            </div>
            <div class='legend-item'>
              <div class='legend-item-box status2'></div>
              <Typography className='legend-item-text'>In Progress</Typography>
            </div>
            <div class='legend-item'>
              <div class='legend-item-box status3'></div>
              <Typography className='legend-item-text'>QA Required</Typography>
            </div>
            <div class='legend-item'>
              <div class='legend-item-box status4'></div>
              <Typography className='legend-item-text'>Completed</Typography>
            </div>
          </div>
          <br />
          <div className='legend-example-container'>
            <div className={'house-card legend-card'}>
              <Typography className='bay-card card-bayName'>Bay #</Typography>
              <Typography className='bay-card card-onlineDate'>
                Online Date
              </Typography>
              <Typography className='bay-card card-npl'>NPL #</Typography>
              <Typography className='bay-card card-modelNumber'>
                Model #
              </Typography>
              <Typography className='bay-card card-customer'>
                Client Name
              </Typography>
              <Typography className='bay-card card-size'>Square Ft.</Typography>
            </div>
            <div>
              <ImArrowRight fontSize={'18px'} style={{ color: 'grey' }} />
            </div>
            <div className='house-card legend-card'>
              <Typography className='bay-card card-bayName'>10</Typography>
              <Typography className='bay-card card-onlineDate'>
                18-Jan-24
              </Typography>
              <Typography className='bay-card card-nTypographyl'>
                1453
              </Typography>
              <Typography className='bay-card card-modelNumber'>
                023-002
              </Typography>
              <Typography className='bay-card card-customer'>
                Conklin
              </Typography>
              <Typography className='bay-card card-size'>999</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LengendExample
