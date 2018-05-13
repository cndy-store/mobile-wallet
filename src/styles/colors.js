import { StyleSheet } from 'react-native';

const rawColors = {
  pink1: 'rgba(255,120,136,1)',
  pink2: 'rgba(255,236,239,1)',
  pink3: 'rgba(255,168,179,1)',
  pink4: 'rgba(255, 77, 98,1)',
  pink5: 'rgba(255, 31, 57,1)',

  orange1: 'rgba(255,175,120,1)',
  orange2: 'rgba(255,244,236,1)',
  orange3: 'rgba(255,203,168,1)',
  orange4: 'rgba(255,149, 77,1)',
  orange5: 'rgba(255,122, 31,1)',

  turquoise1: 'rgba(120,255,232,1)',
  turquoise2: 'rgba(236,255,252,1)',
  turquoise3: 'rgba(168,255,240,1)',
  turquoise4: 'rgba( 77,255,225,1)',
  turquoise5: 'rgba( 31,252,215,1)',

  green1: 'rgba(148,255,120,1)',
  green2: 'rgba(240,255,236,1)',
  green3: 'rgba(186,255,168,1)',
  green4: 'rgba(114,255, 77,1)',
  green5: 'rgba( 77,254, 31,1)',

  purple1: 'rgba(255,120,211,1)',
  purple2: 'rgba(255,236,249,1)',
  purple3: 'rgba(255,168,227,1)',
  purple4: 'rgba(255, 77,197,1)',
  purple5: 'rgba(253, 31,180,1)',

  grey: '#E6E6E6'
};

const semantic = {
  debit: rawColors.purple5,
  credit: rawColors.green5
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
