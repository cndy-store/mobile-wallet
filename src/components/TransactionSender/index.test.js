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

describe('no receiver given', () => {
  const rendered = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
  const instance = rendered.root;
  const component = rendered.getInstance();

  it('renders EnterTransactionReceiver', () => {
    expect(() => {
      instance.findByType(EnterTransactionReceiver);
    }).not.toThrowError();
  });

  it('shows the close button', () => {
    const closeButton = instance.findByProps({ title: 'Close' });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    component.setState({ receiverError: 'Some error' });
    const subcomponent = instance.findByType(EnterTransactionReceiver);
    expect(subcomponent.props.onSubmit).toEqual(component.handleReceiverUpdate);
    expect(subcomponent.props.error).toEqual(component.state.receiverError);
  });
});

describe('no amount given', () => {
  const rendered = renderer.create(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
    />
  );
  const instance = rendered.root;
  const component = rendered.getInstance();

  it('renders EnterTransactionDetails', () => {
    expect(() => {
      instance.findByType(EnterTransactionDetails);
    }).not.toThrowError();
  });

  it('shows the close button', () => {
    const closeButton = instance.findByProps({ title: 'Close' });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    component.setState({ amountError: 'Some error' });
    const subcomponent = instance.findByType(EnterTransactionDetails);
    expect(subcomponent.props.onSubmit).toEqual(component.handleAmountUpdate);
    expect(subcomponent.props.receiver).toEqual(component.state.receiver);
    expect(subcomponent.props.error).toEqual(component.state.amountError);
  });
});

describe('user input complete', () => {
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

  it('renders ConfirmTransactionDetails', () => {
    expect(() => {
      instance.findByType(ConfirmTransactionDetails);
    }).not.toThrowError();
  });

  it('shows the close button', () => {
    const closeButton = instance.findByProps({ title: 'Close' });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    const subcomponent = instance.findByType(ConfirmTransactionDetails);
    expect(subcomponent.props.onConfirm).toEqual(component.handleConfirmation);
    expect(subcomponent.props.onReject).toEqual(component.handleRejection);
    expect(subcomponent.props.receiver).toEqual(component.state.receiver);
    expect(subcomponent.props.amount).toEqual(component.state.amount);
  });
});

describe('transaction in progress', () => {
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

  it('renders TransactionInProgress', () => {
    component.setState({ inProgress: true });

    expect(() => {
      instance.findByType(TransactionInProgress);
    }).not.toThrowError();
  });

  it('hides the close button', () => {
    component.setState({ inProgress: true });

    const closeButton = instance.findAllByProps({ title: 'Close' });
    expect(closeButton).toHaveLength(0);
  });
});

describe('transaction fails', () => {
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

  it('renders TransactionFailure', () => {
    expect(() => {
      instance.findByType(TransactionFailure);
    }).not.toThrowError();
  });

  it('hides the close button', () => {
    const closeButton = instance.findAllByProps({ title: 'Close' });
    expect(closeButton).toHaveLength(0);
  });

  it('passes the correct handler to the subcomponent', () => {
    const subcomponent = instance.findByType(TransactionFailure);
    expect(subcomponent.props.onAcknowledge).toEqual(component.handleFailure);
  });
});

describe('transaction succeeds', () => {
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

  it('renders TransactionSuccess when response was received', () => {
    expect(() => {
      instance.findByType(TransactionSuccess);
    }).not.toThrowError();
  });

  it('hides the close button', () => {
    const closeButton = instance.findAllByProps({ title: 'Close' });
    expect(closeButton).toHaveLength(0);
  });

  it('passes the correct handler to the subcomponent', () => {
    const subcomponent = instance.findByType(TransactionSuccess);
    expect(subcomponent.props.onAcknowledge).toEqual(component.handleSuccess);
  });
});
