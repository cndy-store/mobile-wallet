import axios from 'axios';
import StellarSdk from '../vendor/stellar-base-0.7.7';
StellarSdk.Network.useTestNetwork();

const assetCode = 'CNDY';
const issuerPublicKey =
  'GCJKC2MI63KSQ6MLE6GBSXPDKTDAK43WR522ZYR3F34NPM7Z5UEPIZNX';

const asset = new StellarSdk.Asset(assetCode, issuerPublicKey);

const axiosInstance = axios.create({
  baseURL: 'https://horizon-testnet.stellar.org',
  timeout: 10 * 1000
});

module.exports = {
  axios: axiosInstance,
  asset,
  StellarSdk
};
