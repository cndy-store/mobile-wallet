import { StellarSdk } from '../../lib/stellar';
const { Keypair } = StellarSdk;

const publicKey = 'GCHSUHOKNZQAKTULV5YTMG5CKU2NKE7UUQVN6JT2JY7337CRBIAZ6LXK';
const secret = 'SCM7J5YNOPHVPHMY32Q6OI7WRKQETCSG7ZP3YIYYJEO7MWYCDTSRZM3C';

const keypair = Keypair.fromSecret(secret);

export { keypair, publicKey, secret };
