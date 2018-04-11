import React from 'react';
import renderer from 'react-test-renderer';
import { publicKey } from '../../__tests__/fixtures/keypair';
import { TransactionSender } from './index';
import ConfirmTransactionDetails from './ConfirmTransactionDetails';
import EnterTransactionReceiver from './EnterTransactionReceiver';
import EnterTransactionDetails from './EnterTransactionDetails';
import TransactionFailure from './TransactionFailure';
import TransactionInProgress from './TransactionInProgress';
import TransactionSuccess from './TransactionSuccess';

const onCancel = jest.fn();
const onSuccess = jest.fn();
const onFailure = jest.fn();
const fakeResponse = { data: 'TRANSACTION' };

it('renders correctly without an error', () => {
  const tree = renderer
    .create(
      <TransactionSender
        onCancel={onCancel}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the subcomponent to enter receiver when none is given', () => {
  const instance = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  ).root;

  expect(() => {
    instance.findByType(EnterTransactionReceiver);
  }).not.toThrowError();
});

it('renders the subcomponent to enter amount when none is given', () => {
  const instance = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
    />
  ).root;

  expect(() => {
    instance.findByType(EnterTransactionDetails);
  }).not.toThrowError();
});

it('renders the subcomponent to confirm transaction when all data is given', () => {
  const instance = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  ).root;

  expect(() => {
    instance.findByType(ConfirmTransactionDetails);
  }).not.toThrowError();
});

it('renders waiting subcomponent when in progress', () => {
  const rendered = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  );
  const instance = rendered.root;
  const component = rendered.getInstance();
  component.setState({ inProgress: true });

  expect(() => {
    instance.findByType(TransactionInProgress);
  }).not.toThrowError();
});

it('renders failure subcomponent when error was received', () => {
  const rendered = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  );
  const instance = rendered.root;
  const component = rendered.getInstance();
  component.setState({ error: new Error() });

  expect(() => {
    instance.findByType(TransactionFailure);
  }).not.toThrowError();
});

it('renders success subcomponent when response was received', () => {
  const rendered = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  );
  const instance = rendered.root;
  const component = rendered.getInstance();
  component.setState({ response: fakeResponse });

  expect(() => {
    instance.findByType(TransactionSuccess);
  }).not.toThrowError();
});
