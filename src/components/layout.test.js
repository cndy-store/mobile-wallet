import React from 'react';
import { Container, Row } from './layout';
import { render } from '../__tests__/renderer';

describe('Container', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Container />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('adds additional props', () => {
    const { toJSON } = render(<Container hello="world" />);
    expect(toJSON()).toMatchSnapshot();
  });
});

describe('Row', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Row />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('adds additional props', () => {
    const { toJSON } = render(<Row hello="world" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
