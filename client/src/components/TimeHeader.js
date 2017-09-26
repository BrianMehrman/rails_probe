import React from 'react';

import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Power from 'grommet/components/icons/base/Power';
import Revert from 'grommet/components/icons/base/Revert';

const TimeHeader = ({ isListening, toggleListener, deleteAllReports }) => {
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
        <Box direction='row'
          >
          <Button icon={<Power />}
            label={listeningLabel}
            onClick={toggleListener}
            critical={isListening}
            />
          <Button icon={<Revert />}
            label='Reset'
            size='small'
            onClick={deleteAllReports}
            critical={true}
            />
        </Box>
      </Box>
    </Header>
  )
}

export default TimeHeader
