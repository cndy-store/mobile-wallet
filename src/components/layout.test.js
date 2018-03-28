import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Row } from './layout';

import renderer from 'react-test-renderer';

describe('Container', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('adds additional props', () => {
    const tree = renderer.create(<Container hello="world" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Row', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Row />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('adds additional props', () => {
    const tree = renderer.create(<Row hello="world" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
