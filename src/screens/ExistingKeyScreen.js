import React from 'react';
import ViewWithNavigationLink from '../components/ViewWithNavigationLink';

export default class ExistingKeyScreen extends React.Component {
  render() {
    return (
        <ViewWithNavigationLink
          text="Use an existing key"
          links={['AccountSetup']}
          >
      </ViewWithNavigationLink>
    );
  }
}
