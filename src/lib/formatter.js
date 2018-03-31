const sanitizeOngoingAmountInput = input => {
  const delimiter = '.';

  const allowedChars = input.match(new RegExp(`^[0-9${delimiter}]+`));
  if (!allowedChars) return '';
  if (allowedChars[0] !== input) return allowedChars[0];

  const [first, ...rest] = input.split(new RegExp(`[${delimiter}]+`));
  if (!rest.length) return first;

  return [first, rest.join('')].join(delimiter);
};

export { sanitizeOngoingAmountInput };
