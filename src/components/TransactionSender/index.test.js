import React from 'react';
import { Text } from 'native-base';
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
    const closeButton = root.findByProps({ onPress: instance.handleCancel });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    instance.setState({ receiverError: 'Some error' });
    const subcomponent = root.findByType(EnterTransactionReceiver);
    expect(subcomponent.props.onSubmit).toEqual(instance.handleReceiverUpdate);
    expect(subcomponent.props.error).toEqual(instance.state.receiverError);
  });

  it('updates receiver and resets error when receiver valid', () => {
    instance.setState({ receiver: null });
    const receiverInput = publicKey;

    instance.handleReceiverUpdate({ receiverInput });
    expect(instance.state.receiver).toEqual(publicKey);
    expect(instance.state.receiverError).toEqual(null);
  });

  it('leaves receiver unchanged and adds error when receiver invalid', () => {
    instance.setState({ receiver: publicKey });
    const receiverInput = 'SOMETHING_INVALID';

    instance.handleReceiverUpdate({ receiverInput });
    expect(instance.state.receiver).toEqual(publicKey);
    expect(instance.state.receiverError).toEqual('Invalid public key');
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
    const closeButton = root.findByProps({ onPress: instance.handleCancel });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    instance.setState({ amountError: 'Some error' });
    const subcomponent = root.findByType(EnterTransactionDetails);
    expect(subcomponent.props.onSubmit).toEqual(instance.handleAmountUpdate);
    expect(subcomponent.props.receiver).toEqual(instance.state.receiver);
    expect(subcomponent.props.error).toEqual(instance.state.amountError);
  });

  it('updates amount and resets error when receiver valid', () => {
    instance.setState({ amount: null });
    const amountInput = '10.00';

    instance.handleAmountUpdate({ amountInput });
    expect(instance.state.amount).toEqual(amountInput);
    expect(instance.state.amountError).toEqual(null);
  });

  xit('leaves amount unchanged and adds error when amount invalid', () => {
    instance.setState({ amount: '10.00' });
    const amountInput = 'SOMETHING_INVALID';

    instance.handleAmountUpdate({ amountInput });
    expect(instance.state.amount).toEqual('10.00');
    expect(instance.state.amountError).toEqual('Invalid amount');
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
    const closeButton = root.findByProps({ onPress: instance.handleCancel });
    expect(closeButton).toBeDefined();
  });

  it('passes the correct props to the subcomponent', () => {
    const subcomponent = root.findByType(ConfirmTransactionDetails);
    expect(subcomponent.props.onConfirm).toEqual(instance.handleConfirmation);
    expect(subcomponent.props.onReject).toEqual(instance.handleRejection);
    expect(subcomponent.props.receiver).toEqual(instance.state.receiver);
    expect(subcomponent.props.amount).toEqual(instance.state.amount);
  });

  it('resets amount and adds error when confirmaton rejects', () => {
    instance.handleRejection();
    expect(instance.state.amount).toEqual(null);
    expect(instance.state.amountError).toEqual('Please enter a new amount');
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

  instance.handlePaymentError(new Error('Payment Error'));

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

  it('sets the error state', () => {
    expect(instance.state.error).toEqual('Payment Error');
  });

  it('can handle nested operation information in the error', () => {
    const error = new Error();
    error.data = {
      response: {
        extras: {
          result_codes: { operations: ['op_underfunded', 'tx_invalid'] }
        }
      }
    };

    instance.handlePaymentError(error);
    expect(instance.state.error).toEqual('op_underfunded, tx_invalid');
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
  instance.handlePaymentSuccess({ response: fakeResponse });

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

describe('calling the cancel button', () => {
  it('calls the onCancel callback', () => {
    const { instance, root } = render(
      <TransactionSender
        onCancel={onCancel}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    );

    const closeButton = root.findByProps({ onPress: instance.handleCancel });
    closeButton.props.onPress();

    expect(onCancel).toHaveBeenCalled();
  });
});

it('calls the onSuccess prop when handleSuccess is triggered', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );

  instance.handleSuccess();

  expect(onSuccess).toHaveBeenCalled();
});

it('calls the onFailure prop when handleFailure is triggered', () => {
  const { instance, root } = render(
    <TransactionSender
      onCancel={onCancel}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );

  instance.handleFailure();

  expect(onFailure).toHaveBeenCalled();
});
