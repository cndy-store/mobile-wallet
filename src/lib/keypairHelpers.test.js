import * as helpers from './keypairHelpers';
import { publicKey, secret } from '../__tests__/fixtures/keypair';

describe('encodePublicKey', () => {
  it('encodes a valid public key', () => {
    const url = helpers.encodePublicKey(publicKey);
    expect(url).toEqual(`cndy:${publicKey}`);
  });

  it('encodes a valid public key with meta data', () => {
    const url = helpers.encodePublicKey(publicKey, {
      amount: '123.45',
      meta: 'test'
    });

    expect(url).toEqual(`cndy:${publicKey}?amount=123.45&meta=test`);
  });

  it('returns null if invalid public key is given', () => {
    const url = helpers.encodePublicKey('INVALID_KEY');

    expect(url).toEqual(null);
  });
});

describe('decodePublicKey', () => {
  it('decodes url containing valid public key', () => {
    const url = `cndy:${publicKey}`;
    const result = helpers.decodePublicKey(url);

    expect(result.publicKey).toEqual(publicKey);
    expect(result.options).toEqual({});
  });

  it('decodes url containing valid public key and options', () => {
    const url = `cndy:${publicKey}?amount=123.45&meta=test`;
    const result = helpers.decodePublicKey(url);

    expect(result.publicKey).toEqual(publicKey);
    expect(result.options).toEqual({
      amount: 123.45,
      meta: 'test'
    });
  });

  it('return null if url contains invalid public key', () => {
    const url = `cndy:INVALID_KEY`;
    const result = helpers.decodePublicKey(url);

    expect(result).toEqual(null);
  });

  it('returns null if completely invalid input is given', () => {
    const url = 'SOMETHING_ELSE';
    const result = helpers.decodePublicKey(url);

    expect(result).toEqual(null);
  });
});

describe('encodeSecret', () => {
  it('encodes a valid secret', () => {
    const url = helpers.encodeSecret(secret);
    expect(url).toEqual(`cndysecret:${secret}`);
  });

  it('encodes a valid secret with meta data', () => {
    const url = helpers.encodeSecret(secret, {
      meta: 'test'
    });

    expect(url).toEqual(`cndysecret:${secret}?meta=test`);
  });

  it('returns null if invalid secret is given', () => {
    const url = helpers.encodeSecret('INVALID_SECRET');

    expect(url).toEqual(null);
  });
});

describe('decodeSecret', () => {
  it('decodes url containing valid secret', () => {
    const url = `cndysecret:${secret}`;
    const result = helpers.decodeSecret(url);

    expect(result.secret).toEqual(secret);
    expect(result.options).toEqual({});
  });

  it('decodes url containing valid secret and options', () => {
    const url = `cndysecret:${secret}?meta=test`;
    const result = helpers.decodeSecret(url);

    expect(result.secret).toEqual(secret);
    expect(result.options).toEqual({
      meta: 'test'
    });
  });

  it('return null if url contains invalid secret', () => {
    const url = `cndysecret:INVALID_SECRET`;
    const result = helpers.decodeSecret(url);

    expect(result).toEqual(null);
  });

  it('returns null if completely invalid input is given', () => {
    const url = 'SOMETHING_ELSE';
    const result = helpers.decodeSecret(url);

    expect(result).toEqual(null);
  });
});
