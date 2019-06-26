import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class LinkTextComponent extends React.Component {

  //@Override
  constructor(prop) {
    super(prop);
    this.prop = prop;
  }
  
  //@Override
  render() {
    return (
      <View>
	<Text onPress={ this.openInBrowser.bind(this, this.prop.link) } >
          { this.prop.title }
	</Text>
      </View>
    );
  }

  openInBrowser(link) {
    WebBrowser.openBrowserAsync(link);
  }
}

