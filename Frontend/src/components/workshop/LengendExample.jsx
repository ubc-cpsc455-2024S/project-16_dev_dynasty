import React from 'react'
import BayCard from './BayCard'
import productionLineLegendExample from './data/productionLineLegendExample.js'

const LengendExample = () => {
  const legendBay = {
    bay_id: 'Bay #',
    bay_name: 'Bay #',
    bay_description: 'legend bay',
  }
  const exampleBay = {
    bay_id: '15',
    bay_name: 'Bay 15',
    bay_description: 'example bay',
  }
  return (
    <div className='legend-example'>
      <div className='legend'>Legend</div>
      <div className='example'>Example</div>
      <div className='legend-card'>
        <BayCard bay={legendBay} houses={productionLineLegendExample}></BayCard>
      </div>

      <div className='example-card'>
        <BayCard
          bay={exampleBay}
          houses={productionLineLegendExample}
        ></BayCard>
      </div>
    </div>
  )
}

export default LengendExample
