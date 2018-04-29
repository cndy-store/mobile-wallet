import { asset, axios, StellarSdk } from './stellar';

const { Account, Operation, TransactionBuilder } = StellarSdk;

const loadAccount = async publicKey => {
  const response = await axios.get(`/accounts/${publicKey}`);
  const { data } = response;
  const account = new Account(publicKey, data.sequence);

  return { account, data };
};

const loadPayments = async ({ publicKey, params }) => {
  const urlParams = Object.assign({ limit: 30, order: 'desc' }, params);
  const response = await axios.get(`/accounts/${publicKey}/payments`, {
    params: urlParams
  });

  const { data } = response;
  const records = data._embedded.records;
  const hasNextPage = records.length >= urlParams.limit;

  const filtered = records.filter(
    item =>
      item.type === 'payment' &&
      item.asset_code === asset.getCode() &&
      item.asset_issuer === asset.getIssuer()
  );

  return { data, hasNextPage, payments: filtered };
};

const sendPayment = async ({ amount, receiver, keypair }) => {
  const response = await loadAccount(keypair.publicKey());
  const senderAccount = response.account;

  const payment = Operation.payment({
    asset,
    amount,
    destination: receiver
  });

  const transaction = new TransactionBuilder(senderAccount)
    .addOperation(payment)
    .build();

  transaction.sign(keypair);

  const tx = encodeURIComponent(
    transaction
      .toEnvelope()
      .toXDR()
      .toString('base64')
  );

  const transactionResponse = await axios.post(`/transactions`, `tx=${tx}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return { data: transactionResponse.data };
};

export { loadAccount, loadPayments, sendPayment };
