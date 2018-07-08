import axios from 'axios';
import StellarSdk from '../vendor/stellar-base-0.7.7';

StellarSdk.Network.useTestNetwork();

const assetCode = 'CNDY';
const issuerPublicKey =
  'GCJXUXAY4UQYPYVKRMQJJW3IG4AFBMT7RLA7DVB6UZDMJNMGEMFSCVRY';

const asset = new StellarSdk.Asset(assetCode, issuerPublicKey);

const axiosInstance = axios.create({
  baseURL: 'https://horizon-testnet.stellar.org',
  timeout: 30 * 1000
});

module.exports = {
  axios: axiosInstance,
  asset,
  StellarSdk
};
