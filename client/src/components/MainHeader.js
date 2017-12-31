import React from 'react';

import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Checkbox from 'grommet/components/CheckBox';
import Box from 'grommet/components/Box';
import Power from 'grommet/components/icons/base/Power';
import Actions from 'grommet/components/icons/base/Actions';
import Revert from 'grommet/components/icons/base/Revert';


const ConfigControl = ({ config, onChange }) => {
  const onChangeEach = (e) => {
    const { target } = e;
    config[target.name] = target.checked;
    onChange(config);
  }

  return (
    <Menu
      responsive={false}
      closeOnClick={false}
      icon={<Actions />}
      primary={true}
      size='large'
     >
     <span>Select printers</span>
     <Checkbox label='Graph Text' name='graphText' checked={config.graphText} onChange={onChangeEach} />
     <Checkbox label='Graph HTML' name='graphHtml' checked={config.graphHtml} onChange={onChangeEach} />
     <Checkbox label='Call Stack' name='callStack' checked={config.callStack} onChange={onChangeEach} />
   </Menu>
  )
}

const MainHeader = ({ isListening, toggleListener, deleteAllReports, listenerConfig, onListenerConfigChange }) => {
  const listeningLabel = isListening ? 'Disable' : 'Enable';

  return (
    <Header justify="center" colorIndex='neutral-1'>
      <Box
        direction='column'
        flex={true}
        pad='small'>
          <Title justify='start' align='center' >Rails Probe</Title>
      </Box>
      <Box pad={ 'small' }
        direction='column'
        colorIndex='light-2'>
        <Box direction='row'>
          <Box direction='row'
            margin='small'>
            <Button icon={<Power />}
              className="MainHeader-listening-button"
              label={listeningLabel}
              onClick={toggleListener}
              critical={isListening}
              />
          </Box>
          <Box direction='row'
            margin='small'>
            <Button icon={<Revert />}
              label='Reset'
              size='small'
              onClick={deleteAllReports}
              critical={true}
              />
          </Box>
          <Box direction='row'
          margin='small'>
            <ConfigControl config={listenerConfig} onChange={onListenerConfigChange} />
          </Box>
        </Box>
      </Box>
    </Header>
  )
}

export default MainHeader
