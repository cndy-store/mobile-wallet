import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HeaderTitle } from 'react-navigation';
import { asset } from '../lib/stellar';

const defaultText = '...';

export class HeaderWithBalance extends Component {
  getBalance() {
    if (!this.props.data) return null;

    const assetToShow = this.props.data.balances.find(
      item =>
        item.asset_code === asset.getCode() &&
        item.asset_issuer === asset.getIssuer()
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

HeaderWithBalance.defaultProps = {
  data: null
};

HeaderWithBalance.propTypes = {
  data: PropTypes.shape({
    balances: PropTypes.array.isRequired
  })
};

const mapStateToProps = state => ({
  data: state.account.data
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithBalance);
