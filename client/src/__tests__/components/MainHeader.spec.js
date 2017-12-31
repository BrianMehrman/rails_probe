import React from 'react';
import { mount } from 'enzyme';

import MainHeader from '../../components/MainHeader';

const config = {
  graphText: false,
  graphHtml: false,
  callStack: false
}

test('MainHeader displays `Enable` when not listening', () => {
  const component = mount(
    <MainHeader
      isListening={false}
      toggleListener={()=>true}
      listenerConfig={config} />
  );
  const button = component.find('.MainHeader-listening-button').first();
  expect(button.text()).toContain('Enable');
});

test('MainHeader displays `Disable` when listening.', () =>{
  const component = mount(
    <MainHeader
      isListening={true}
      toggleListener={()=>true}
      listenerConfig={config} />
  );
  const button = component.find('.MainHeader-listening-button').first();
  expect(button.text()).toContain('Disable');
});
