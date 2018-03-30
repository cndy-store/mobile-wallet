import { AsyncStorage } from 'react-native';

const getItem = key => AsyncStorage.getItem(key);

const setItem = (key, value) => AsyncStorage.setItem(key, value);

const removeItem = key => AsyncStorage.removeItem(key);

export { getItem, setItem, removeItem };
