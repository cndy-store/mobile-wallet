import { padEnd } from 'lodash';

const delimiter = '.';
const maxPrecisionLength = 7;

const allowedChars = new RegExp(`^[0-9${delimiter}]+`);
const delimiterSplit = new RegExp(`[${delimiter}]+`);

const sanitizeOngoingAmountInput = input => {
  const onlyAllowedChars = input.match(allowedChars);
  if (!onlyAllowedChars) return '';
  if (onlyAllowedChars[0] !== input) return onlyAllowedChars[0];

  const [precision, ...rest] = input.split(delimiterSplit);
  if (!precision.length) return '';
  if (!rest.length) return precision;

  let scale = rest.join('');
  if (scale.length > maxPrecisionLength) {
    scale = scale.substr(0, maxPrecisionLength);
  }

  return [precision, scale].join(delimiter);
};

const ensureScale = input => {
  const [precision, scale] = input.split(delimiter);
  const paddedScale = padEnd(scale || '', 2, '0');

  return `${precision}${delimiter}${paddedScale}`;
};

const parseTransactionAmount = input => {
  const sanitized = sanitizeOngoingAmountInput(input);
  if (sanitized === '') return null;

  return ensureScale(sanitized);
};

export { sanitizeOngoingAmountInput, parseTransactionAmount };
