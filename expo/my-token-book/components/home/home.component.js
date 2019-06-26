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

import LinkTextComponent from '../link-text/link-text.component';

import styles from './home.component.style';

export default class HomeComponent extends React.Component {
  //@Override
  render() {
    return (
      <View style={ styles.container }>
        <ScrollView style={ styles.container } contentContainerStyle={ styles.contentContainer }>

	  { /* Logo */ }
	  <View style={ styles.welcomeContainer }>
            <Image source={
		     __DEV__
		     ? require('../../assets/images/robot-dev.png')
		     : require('../../assets/images/robot-prod.png')
		   }
		   style={ styles.welcomeImage }>
	    </Image>
          </View>

          { /* content */ }
	  <View style={styles.getStartedContainer}>
            <LinkTextComponent title="My Token Book" link="http://mytokenbook.com" />

            <Text style={styles.getStartedText}>Hello World!</Text>

          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <Text style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

function Link1Component(prop) {
  if (__DEV__) {
    const ATag = (
      <Text onPress={ (link) => openInBrowser } style={styles.helpLinkText}>
        { prop.title }
      </Text>
    );

    const openInBrowser = (link) => { WebBrowser.openBrowserAsync(link); };

    return (
      <Text style={styles.developmentModeText}>
        This is my link: { ATag }
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

