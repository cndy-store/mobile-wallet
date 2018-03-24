import { asset, axios, StellarSdk } from './stellar';
const { Account, Keypair, Operation, StrKey, TransactionBuilder } = StellarSdk;

const loadAccount = async publicKey => {
  const response = await axios.get(`/accounts/${publicKey}`);
  const data = response.data;
  const account = new Account(publicKey, data.sequence);

  return { account, data };
};

const sendPayment = async ({ amount, receiver, keypair }) => {
  let senderAccount;
  const response = await loadAccount(keypair.publicKey());
  senderAccount = response.account;

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

export { loadAccount, sendPayment };
