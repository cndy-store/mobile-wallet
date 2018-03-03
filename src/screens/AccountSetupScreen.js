import React from 'react';
import ViewWithNavigationLink from '../components/ViewWithNavigationLink';

export default class AccountSetupScreen extends React.Component {
  render() {
    return (
      <ViewWithNavigationLink text="Setting up the account" links={['Send']} />
    );
  }
}
