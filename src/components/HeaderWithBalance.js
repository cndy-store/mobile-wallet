import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderTitle } from 'react-navigation';
import { asset } from '../lib/stellar';

const defaultText = '...';

export class HeaderWithBalance extends React.Component {
  getBalance() {
    if (!this.props.data) return null;

    const assetToShow = this.props.data.balances.find(
      item =>
        item.asset_code == asset.getCode() &&
        item.asset_issuer == asset.getIssuer()
    );

    if (!assetToShow) return null;

    const balance = parseFloat(assetToShow.balance, 10);

    return `${balance.toFixed(7)} 🍭`;
  }

  render() {
    const text = this.getBalance() || defaultText;

    return <HeaderTitle>{text}</HeaderTitle>;
  }
}

HeaderWithBalance.propTypes = {};

const mapStateToProps = state => {
  return {
    data: state.account.data
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithBalance);
