import { padEnd, reduceRight } from 'lodash';
import { localeSettings } from './i18n';

const delimiter = localeSettings.decimalSeparator;
const finalDelimiter = '.';
const maxPrecisionLength = 7;

const allowedChars = new RegExp(`^[0-9${delimiter}${finalDelimiter}]+`);
const delimiterSplit = new RegExp(`[${delimiter}${finalDelimiter}]+`);

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
  const withScale = ensureScale(sanitized);

  const withCorrectDelimiter = withScale.replace(delimiter, finalDelimiter);
  return withCorrectDelimiter;
};

const optimizeScale = scale => {
  const scaleNumbers = scale.split('');
  const neededNumbers = reduceRight(
    scaleNumbers,
    (acc, number) => {
      if (acc.length || number !== '0') {
        acc.push(number);
      }
      return acc;
    },
    []
  );

  return neededNumbers.reverse().join('');
};

// this method is to be used with normalized amount strings
const shortFormat = input => {
  const [precision, scale] = input.split(finalDelimiter);
  const optimizedScale = optimizeScale(scale);
  const paddedScale = padEnd(optimizedScale, 2, '0');

  return `${precision}${delimiter}${paddedScale}`;
};

export { sanitizeOngoingAmountInput, parseTransactionAmount, shortFormat };
