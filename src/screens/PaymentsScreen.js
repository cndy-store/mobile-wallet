import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';

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
  Title,
  Content,
  Tab,
  Tabs
} from 'native-base';

import MainScreenHeader from '../components/MainScreenHeader';
import PaymentListItem from '../components/PaymentListItem';

const keyExtractor = (item, index) => item.id;
const data = [
  {
    id: '37302740153602049',
    type: 'credit',
    publicKey: 'GBET4AVL4BYLFJTFKX2UYE3Y3EHNZXOBMBO5FP7O5FFTHSEAPZ5VEHHD',
    amount: '1221.000000',
    createdAt: '2018-04-28T15:16:28Z'
  },
  {
    id: '47302740153602049',
    type: 'debit',
    publicKey: 'GBET4AVL4BYLFJTFKX2UYE2Y3E2NZXOBMBO5FP7O5FFTHSEAPZ5VEHHD',
    amount: '100.000000',
    createdAt: '2018-04-28T15:12:28Z'
  }
];

class PaymentsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };

    this.renderListItem = this.renderListItem.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
  }

  renderListItem({ item }) {
    return (
      <PaymentListItem
        type={item.type}
        publicKey={item.publicKey}
        amount={item.amount}
        createdAt={item.createdAt}
      />
    );
  }

  render() {
    return (
      <Container>
        <MainScreenHeader hasTabs={false} />
        <View padder>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={this.renderListItem}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    keypair: state.keypair.keypait
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);
