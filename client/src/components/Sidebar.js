import React from 'react';

import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

const SideMenu = () => {
  return (
  <Sidebar colorIndex='neutral-1'
    pad='none'
    size='small'>
    <Header pad='small' justify='between'>
      <Box flex='grow' justify='start'>
        <Menu primary={true}>
          <Anchor href='#' className='active'>
            Dashboard
          </Anchor>
        </Menu>
      </Box>
    </Header>
  </Sidebar>
  )
}

export default SideMenu;
