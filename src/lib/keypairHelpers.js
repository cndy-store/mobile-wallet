import { asset, StellarSdk } from '../lib/stellar';
import bip21 from 'bip21';

const { StrKey } = StellarSdk;

const scheme = asset.getCode().toLowerCase();
const secretScheme = `${scheme}secret`;

const isValidPublicKey = publicKey => StrKey.isValidEd25519PublicKey(publicKey);
const isValidSecret = secret => StrKey.isValidEd25519SecretSeed(secret);

const encodePublicKey = (publicKey, options = {}) => {
  if (!isValidPublicKey(publicKey)) return null;
  options.scheme = scheme;
  return bip21.encode(publicKey, options);
};

const decodePublicKey = url => {
  let decoded;
  try {
    decoded = bip21.decode(url, scheme);
  } catch (e) {
    return null;
  }

  const publicKey = decoded.address;
  if (!isValidPublicKey(publicKey)) return null;

  return {
    publicKey,
    options: decoded.options
  };
};

const encodeSecret = (secret, options = {}) => {
  if (!isValidSecret(secret)) return null;
  options.scheme = secretScheme;
  return bip21.encode(secret, options);
};

const decodeSecret = url => {
  let decoded;
  try {
    decoded = bip21.decode(url, secretScheme);
  } catch (e) {
    return null;
  }

  const secret = decoded.address;
  if (!isValidSecret(secret)) return null;

  return {
    secret,
    options: decoded.options
  };
};

export {
  isValidPublicKey,
  isValidSecret,
  encodePublicKey,
  decodePublicKey,
  encodeSecret,
  decodeSecret
};
