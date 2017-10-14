import MainHeader from '../../components/MainHeader';
import React from 'react';
import renderer from 'react-test-renderer';

test('MainHeader Enable button triggers callback', () => {
  const config = {
    graphText: false,
    graphHtml: false,
    callStack: false
  }
  const component = renderer.create(
      <MainHeader
        isListening={false}
        toggleListener={()=>true}
        listenerConfig={config} />
    );
});
