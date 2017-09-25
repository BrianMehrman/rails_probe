import TimeHeader from '../../components/TimeHeader';
import React from 'react';
import renderer from 'react-test-renderer';

test('TimeHeader Enable button triggers callback', () => {
  const component = renderer.create(
      <TimeHeader isListening={false} toggleListener={listener}>
    );
});
