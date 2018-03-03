import React from 'react';
import ViewWithNavigationLink from '../components/ViewWithNavigationLink';

export default class BootupScreen extends React.Component {
  render() {
    return (
        <ViewWithNavigationLink
          text="Booting Up and deciding what to do..."
          links={['Welcome']}
          >
      </ViewWithNavigationLink>
    );
  }
}
