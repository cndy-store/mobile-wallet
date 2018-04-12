import React from 'react';
import { render } from '../../__tests__/renderer';
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
  const { toJSON } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
  expect(toJSON()).toMatchSnapshot();
});

describe('no receiver given', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );

  it('renders EnterTransactionReceiver', () => {
    expect(() => {
      root.findByType(EnterTransactionReceiver);
    }).not.toThrowError();
  });

  it('shows the close button', () => {
    const closeButton = root.findByProps({ title: 'Close' });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    instance.setState({ receiverError: 'Some error' });
    const subcomponent = root.findByType(EnterTransactionReceiver);
    expect(subcomponent.props.onSubmit).toEqual(instance.handleReceiverUpdate);
    expect(subcomponent.props.error).toEqual(instance.state.receiverError);
  });
});

describe('no amount given', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
    />
  );

  it('renders EnterTransactionDetails', () => {
    expect(() => {
      root.findByType(EnterTransactionDetails);
    }).not.toThrowError();
  });

  it('shows the close button', () => {
    const closeButton = root.findByProps({ title: 'Close' });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    instance.setState({ amountError: 'Some error' });
    const subcomponent = root.findByType(EnterTransactionDetails);
    expect(subcomponent.props.onSubmit).toEqual(instance.handleAmountUpdate);
    expect(subcomponent.props.receiver).toEqual(instance.state.receiver);
    expect(subcomponent.props.error).toEqual(instance.state.amountError);
  });
});

describe('user input complete', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  );

  it('renders ConfirmTransactionDetails', () => {
    expect(() => {
      root.findByType(ConfirmTransactionDetails);
    }).not.toThrowError();
  });

  it('shows the close button', () => {
    const closeButton = root.findByProps({ title: 'Close' });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    const subcomponent = root.findByType(ConfirmTransactionDetails);
    expect(subcomponent.props.onConfirm).toEqual(instance.handleConfirmation);
    expect(subcomponent.props.onReject).toEqual(instance.handleRejection);
    expect(subcomponent.props.receiver).toEqual(instance.state.receiver);
    expect(subcomponent.props.amount).toEqual(instance.state.amount);
  });
});

describe('transaction in progress', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  );

  it('renders TransactionInProgress', () => {
    instance.setState({ inProgress: true });

    expect(() => {
      root.findByType(TransactionInProgress);
    }).not.toThrowError();
  });

  it('hides the close button', () => {
    instance.setState({ inProgress: true });

    const closeButton = root.findAllByProps({ title: 'Close' });
    expect(closeButton).toHaveLength(0);
  });
});

describe('transaction fails', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  );
  instance.setState({ error: new Error() });

  it('renders TransactionFailure', () => {
    expect(() => {
      root.findByType(TransactionFailure);
    }).not.toThrowError();
  });

  it('hides the close button', () => {
    const closeButton = root.findAllByProps({ title: 'Close' });
    expect(closeButton).toHaveLength(0);
  });

  it('passes the correct handler to the subcomponent', () => {
    const subcomponent = root.findByType(TransactionFailure);
    expect(subcomponent.props.onAcknowledge).toEqual(instance.handleFailure);
  });
});

describe('transaction succeeds', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
      receiver={publicKey}
      amount={'100.00'}
    />
  );
  instance.setState({ response: fakeResponse });

  it('renders TransactionSuccess when response was received', () => {
    expect(() => {
      root.findByType(TransactionSuccess);
    }).not.toThrowError();
  });

  it('hides the close button', () => {
    const closeButton = root.findAllByProps({ title: 'Close' });
    expect(closeButton).toHaveLength(0);
  });

  it('passes the correct handler to the subcomponent', () => {
    const subcomponent = root.findByType(TransactionSuccess);
    expect(subcomponent.props.onAcknowledge).toEqual(instance.handleSuccess);
  });
});
