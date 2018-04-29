import { StyleSheet } from 'react-native';

const rawColors = {
  grey: '#E6E6E6',
  pinkLight: '#FFB3B3',
  pink: '#FF7888',
  greenLight: '#21A68D',
  green: '#169185'
};

const semantic = {
  primary: rawColors.pink,
  primaryHighlight: rawColors.pinkLight,
  alternative: rawColors.green,
  alternativeHighlight: rawColors.greenLight,
  debit: '#FF0000',
  credit: '#00FF00'
};

const color = StyleSheet.create({
  debit: {
    color: semantic.debit
  },
  credit: {
    color: semantic.credit
  }
});

export { color, rawColors };
