import React from 'react';
import { Button, View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class ViewWithNavigationLink extends React.Component {
  render() {
    const links = this.props.links.map(link => (
      <Button
        key={link}
        onPress={() => this.props.navigation.navigate(link)}
        title={link}
      />
    ));

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.props.text}</Text>
        {links}
      </View>
    );
  }
}

export default withNavigation(ViewWithNavigationLink);
