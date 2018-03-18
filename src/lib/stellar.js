import StellarSdk from '../vendor/stellar-base-0.7.7';
StellarSdk.Network.useTestNetwork();

const assetCode = 'CNDY';
const issuerPublicKey =
  'GCJKC2MI63KSQ6MLE6GBSXPDKTDAK43WR522ZYR3F34NPM7Z5UEPIZNX';

const asset = new StellarSdk.Asset(assetCode, issuerPublicKey);
// const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

module.exports = {
  // server,
  asset,
  StellarSdk
};
