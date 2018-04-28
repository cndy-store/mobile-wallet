import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';
import Dimensions from 'Dimensions';
import { styles as s } from 'react-native-style-tachyons';

const icons = [
  require('../../../assets/img/food/1.png'),
  require('../../../assets/img/food/2.png'),
  require('../../../assets/img/food/3.png'),
  require('../../../assets/img/food/4.png'),
  require('../../../assets/img/food/5.png'),
  require('../../../assets/img/food/6.png')
];

const { width, height } = Dimensions.get('window');

class TransactionInProgress extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BouncingPreloader
          icons={icons}
          leftDistance={-100}
          rightDistance={-150}
          speed={1000}
        />
        <Text style={s.mt5}>Transaction in Progress...</Text>
      </View>
    );
  }
}

TransactionInProgress.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default TransactionInProgress;
