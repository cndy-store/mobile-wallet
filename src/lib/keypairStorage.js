import * as Keychain from 'react-native-keychain';

const getItem = async _key => {
  const credentials = await Keychain.getGenericPassword();
  return Promise.resolve(credentials.password);
};

const setItem = (key, value) => {
  return Keychain.setGenericPassword(key, value);
};

const removeItem = _key => {
  return Keychain.resetGenericPassword();
};

export { getItem, setItem, removeItem };
