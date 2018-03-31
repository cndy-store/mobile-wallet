import { sanitizeOngoingAmountInput } from './formatter';

describe('sanitizeOngoingAmountInput', () => {
  it('returns empty string if an invalid string is passed', () => {
    const result = sanitizeOngoingAmountInput('hello');
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
});
