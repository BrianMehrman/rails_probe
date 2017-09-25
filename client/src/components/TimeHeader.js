import React from 'react';

import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Power from 'grommet/components/icons/base/Power';

const TimeHeader = ({ isListening, toggleListener }) => {
  const listeningLabel = isListening ? 'Disable' : 'Enable';

console.log(isListening);
  return (
    <Header justify="center" colorIndex='neutral-1'>
      <Box
        size={{width: {min: 'auto', max: 'xxlarge'}}}
        direction='column'
        flex={true}
        pad='small'>
          <Title justify='start' align='center' >Rails Probe</Title>
      </Box>
      <Box pad={ 'small' }
        direction='column'
        colorIndex='light-2'>
        <Button icon={<Power />}
          label={listeningLabel}
          onClick={toggleListener}
          critical={isListening}
          />
      </Box>
    </Header>
  )
}

export default TimeHeader
