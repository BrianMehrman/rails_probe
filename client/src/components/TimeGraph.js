import React from 'react';
import Timeline from 'react-visjs-timeline'

import Box from 'grommet/components/Box';

import './TimeGraph.css';

const TimeGraph = ({ reports }) => {
  const attributes = {
    items: reports,
    options: {
      format: {
        minorLabels: {
          minute: 'h:mma',
          hour: 'ha'
        }
      },
      width: '100%',
    }
  };

  return (
    <Box className='Timeline'
         direction='row'
         justify='center'
         align='center'
         flex={true}
         colorIndex='light-2'>
      <Timeline {...attributes} />
    </Box>
  )
}

export default TimeGraph;
