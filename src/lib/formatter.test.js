import {
  sanitizeOngoingAmountInput,
  parseTransactionAmount,
  shortFormat
} from './formatter';

describe('sanitizeOngoingAmountInput', () => {
  it('returns empty string if an invalid string is passed', () => {
    const result = sanitizeOngoingAmountInput('hello');
    expect(result).toEqual('');
  });

  it('returns empty string if the input begins with dot', () => {
    const result = sanitizeOngoingAmountInput('.12');
    expect(result).toEqual('');
  });

  it('returns empty string if a partially invalid string is passed', () => {
    const result = sanitizeOngoingAmountInput('123ABC');
    expect(result).toEqual('123');
  });

  it('returns input if no delimiter present', () => {
    const result = sanitizeOngoingAmountInput('111');
    expect(result).toEqual('111');
  });

  it('returns input if it ends with one delimiter', () => {
    const result = sanitizeOngoingAmountInput('111.');
    expect(result).toEqual('111.');
  });

  it('removes additional delimiters if input ends with one delimiter', () => {
    const result = sanitizeOngoingAmountInput('111..');
    expect(result).toEqual('111.');
  });

  it('removes additional delimiters', () => {
    const result = sanitizeOngoingAmountInput('111..222.333');
    expect(result).toEqual('111.222333');
  });

  it('does not allow negative numbers', () => {
    const result = sanitizeOngoingAmountInput('-12.34');
    expect(result).toEqual('');
  });

  it('enforces maximal precision of seven decimal places', () => {
    const result = sanitizeOngoingAmountInput('123.12345678');
    expect(result).toEqual('123.1234567');
  });

  it('returns something that is already valid', () => {
    const result = sanitizeOngoingAmountInput('123.456');
    expect(result).toEqual('123.456');
  });
});

describe('parseTransactionAmount', () => {
  it('returns null if sanitizeOngoingAmountInput returns empty string', () => {
    const result = parseTransactionAmount('hello');
    expect(result).toEqual(null);
  });

  it('ensures the scale of at least to digits', () => {
    let result = parseTransactionAmount('12');
    expect(result).toEqual('12.00');

    result = parseTransactionAmount('12.');
    expect(result).toEqual('12.00');

    result = parseTransactionAmount('12.0');
    expect(result).toEqual('12.00');

    result = parseTransactionAmount('12.0001');
    expect(result).toEqual('12.0001');
  });
});

describe('shortFormat', () => {
  it('keeps a simple amount', () => {
    const amount = '12.34';
    expect(shortFormat(amount)).toEqual('12.34');
  });

  it('shortens a simple amount with unnecessary zeroes', () => {
    const amount = '12.000000';
    expect(shortFormat(amount)).toEqual('12.00');
  });

  it('keeps a more-complex amount and does not lose information', () => {
    const amount = '12.000001';
    expect(shortFormat(amount)).toEqual(amount);
  });

  it('keeps a precision of at least two', () => {
    const amount = '12.1';
    expect(shortFormat(amount)).toEqual('12.10');
  });
});
