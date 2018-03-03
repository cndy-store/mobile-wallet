import React from 'react';
import ViewWithNavigationLink from '../components/ViewWithNavigationLink';

export default class WelcomeScreen extends React.Component {
  render() {
    return (
        <ViewWithNavigationLink
          text="Welcome"
          links={['GenerateKey', 'ExistingKey']}
          >
      </ViewWithNavigationLink>
    );
  }
}
