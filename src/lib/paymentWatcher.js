let timeout = null;
let pollingInterval = 3000;

const start = (dispatcher, loadFn, publicKey) => {
  if (timeout) {
    return;
  }

  timeout = window.setTimeout(() => {
    dispatcher(loadFn(publicKey))
      .then(() => {
        timeout = null;
        start(dispatcher, loadFn, publicKey);
      })
      .catch(error => {
        console.error(error);
      });
  }, pollingInterval);
};

const stop = () => {
  if (timeout) window.clearTimeout(timeout);
  timeout = null;
};

export { start, stop };
