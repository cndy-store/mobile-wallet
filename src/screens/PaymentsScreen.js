import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList } from 'react-native';
import {
  View,
  Button,
  Text,
  Icon,
  Container,
  Header,
  Left,
  Right,
  Body,
  Toast,
  Title,
  Content,
  Tab,
  Tabs
} from 'native-base';
import moment from 'moment';

import { loadPayments } from '../actions/payments';
import MainScreenHeader from '../components/MainScreenHeader';
import PaymentListItem from '../components/PaymentListItem';

class PaymentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };

    this.renderListItem = this.renderListItem.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.loadPayments();
  }

  loadPayments = async () => {
    this.props.loadPayments(this.props.keypair.publicKey()).catch(e => {
      Toast.show({
        text: 'Could not load payment data. Please check internet connection.'
      });
    });
  };

  handleRefresh() {
    this.loadPayments();
  }

  transformData(payments) {
    const me = this.props.keypair.publicKey();

    return payments.map(payment => {
      let type, publicKey;
      if (payment.from === me) {
        type = 'debit';
        publicKey = payment.to;
      } else {
        type = 'credit';
        publicKey = payment.from;
      }

      const createdAt = moment(payment.created_at).format('MMM Do YYYY, HH:mm');

      return {
        key: payment.id,
        amount: payment.amount,
        createdAt,
        type,
        publicKey
      };
    });
  }

  renderHeader() {
    return <MainScreenHeader hasTabs={false} />;
  }

  renderListItem({ item }) {
    return <PaymentListItem {...item} />;
  }

  shouldRenderList() {
    return this.props.payments.length >= 0;
  }

  renderHeaderWithoutList() {
    if (this.shouldRenderList()) return null;

    return this.renderHeader();
  }

  renderList() {
    if (!this.shouldRenderList()) return null;

    return (
      <FlatList
        data={this.transformData(this.props.payments)}
        renderItem={this.renderListItem}
        refreshing={this.props.isProcessing}
        onRefresh={this.handleRefresh}
        ListHeaderComponent={this.renderHeader}
        stickyHeaderIndices={[0]}
      />
    );
  }

  renderActivityIndicator() {
    if (this.props.payments.length) return null;
    if (!this.props.isProcessing) return null;

    return <ActivityIndicator />;
  }

  renderEmptyState() {
    if (!this.props.firstPageLoaded) return null;
    if (this.props.payments.length) return null;

    return <Text>No payment data available</Text>;
  }

  render() {
    return (
      <Container>
        <View>
          {this.renderHeaderWithoutList()}
          {this.renderActivityIndicator()}
          {this.renderEmptyState()}
          {this.renderList()}
        </View>
      </Container>
    );
  }
}

PaymentsScreen.propTypes = {
  keypair: PropTypes.object.isRequired,
  loadPayments: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    keypair: state.keypair.keypair,
    isProcessing: state.payments.isProcessing,
    payments: state.payments.payments,
    firstPageLoaded: state.payments.firstPageLoaded,
    hasNextPage: state.payments.hasNextPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPayments: publicKey => dispatch(loadPayments(publicKey))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);
