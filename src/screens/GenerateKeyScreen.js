import React from 'react';
import ViewWithNavigationLink from '../components/ViewWithNavigationLink';

export default class GenerateKeyScreen extends React.Component {
  render() {
    return (
        <ViewWithNavigationLink
          text="Generate a new key"
          links={['AccountSetup']}
          >
      </ViewWithNavigationLink>
    );
  }
}
