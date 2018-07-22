import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { Title } from 'native-base';
import { asset } from '../lib/stellar';

const defaultText = '...';

export class HeaderTitleWithBalance extends Component {
  getBalance() {
    if (!this.props.data) return null;

    const assetToShow = this.props.data.balances.find(
      item =>
        item.asset_code === asset.getCode() &&
        item.asset_issuer === asset.getIssuer()
    );

    if (!assetToShow) return null;

    const balance = parseFloat(assetToShow.balance, 10);

    return `~${balance.toFixed(2)} ${asset.getCode()}`;
  }

  render() {
    const text = this.getBalance() || defaultText;

    return <Title>{text}</Title>;
  }
}

HeaderTitleWithBalance.defaultProps = {
  data: null
};

HeaderTitleWithBalance.propTypes = {
  data: PropTypes.shape({
    balances: PropTypes.array.isRequired
  })
};

const mapStateToProps = state => ({
  data: state.account.data
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  HeaderTitleWithBalance
);
