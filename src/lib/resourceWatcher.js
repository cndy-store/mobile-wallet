let timeouts = {};
let pollingInterval = 3000;

const start = (name, dispatcher, loadFn, publicKey) => {
  if (timeouts[name]) {
    return;
  }

  timeouts[name] = window.setTimeout(() => {
    dispatcher(loadFn(publicKey))
      .then(() => {
        timeouts[name] = null;
        start(name, dispatcher, loadFn, publicKey);
      })
      .catch(error => {
        console.error(error);
      });
  }, pollingInterval);
};

const stop = name => {
  if (timeouts[name]) window.clearTimeout(timeouts[name]);
  timeouts[name] = null;
};

const startPaymentsWatcher = start.bind(null, 'payments');
const stopPaymentsWatcher = stop.bind(null, 'payments');

const startAcccountWatcher = start.bind(null, 'account');
const stopAccountWatcher = stop.bind(null, 'account');

export {
  startPaymentsWatcher,
  stopPaymentsWatcher,
  startAcccountWatcher,
  stopAccountWatcher
};
