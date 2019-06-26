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

let title = 'My Token Book';
let link = 'https://mytokenbook.com';

export default class LinkComponent extends React.Component {
  //@Override
  render() {
    return (
      <View>
	<Text onPress={ this.openInBrowser.bind(this, link } >
          { title }
	</Text>
      </View>
    );
  }

  openInBrowser(link) {
    WebBrowser.openBrowserAsync(link);
  }
}
