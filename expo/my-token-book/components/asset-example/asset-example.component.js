import * as React from 'react';
import { Button, Text, View, StyleSheet, Image, Platform, TouchableHighlight, TouchableNativeFeedback } from 'react-native';

export default class AssetExampleComponent extends React.Component {
  //@override
  render() {
    var msg = 'Hello World!';
    var TouchableElement = TouchableHighlight;
    if ('android' === Platform.OS) {
     TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          The updated message: {msg}
        </Text>
        <Image style={styles.logo} source={require('../../assets/200x200.png')} />
        <Button title="click me"
                onPress={ this.onPressClickMe.bind(this) }
        />
      </View>
    );
  }

  onPressClickMe() {
    alert('hello world');
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
