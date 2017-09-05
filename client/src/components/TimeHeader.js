import React from 'react';

import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Power from 'grommet/components/icons/base/Power';

const TimeHeader = ({ isListening, toggleListener }) => {
  const listeningLabel = isListening ? 'Disable' : 'Enable';
  const colorIndex = isListening ? 'critical' : 'ok';
console.log(isListening);
console.log(colorIndex);
  return (
    <Header justify="center" colorIndex='neutral-1' >
      <Box
        size={{width: {max: 'xxlarge'}}}
        direction='row'
        flex={true}
        pad='small'>
          <Title justify='start' align='center' >Rails Probe</Title>
      </Box>
      <Box pad={ 'small' }
        colorIndex='light-2'>
        <Button icon={<Power />}
          label={listeningLabel}
          colorIndex={colorIndex}
          onClick={toggleListener}
          critical={false}
          primary={true}
          secondary={false}
          />
      </Box>
    </Header>
  )
}

export default TimeHeader
