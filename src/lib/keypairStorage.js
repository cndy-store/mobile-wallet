import { AsyncStorage } from 'react-native';

const getItem = key => {
  return AsyncStorage.getItem(key);
};

const setItem = (key, value) => {
  return AsyncStorage.setItem(key, value);
};

const removeItem = key => {
  return AsyncStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
