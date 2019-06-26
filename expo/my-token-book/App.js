import React from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import AppContainerComponent from './components/app-container/app-container.component';
import styles from './App.style';

//export default class App extends React.Component {
//  render() {
//    return (
//      <View style={ styles.container }>
//        <Text>
//          Hello World!
//        </Text>
//      </View>
//    );
//  }
//}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={ loadResourcesAsync }
        onError={ handleLoadingError }
        onFinish={ () => handleFinishLoading(setLoadingComplete) }
        />
    );
  } else {
    return (
      <View style={styles.container}>
        { 'ios' === Platform.OS && <StatusBar barStyle="default"/> }
        <AppContainerComponent />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    //Font.loadAsync({
    //  // This is the font that we are using for our tab bar
    //  ...Ionicons.font,
    //  // We include SpaceMono because we use it in HomeScreen.js. Feel free to
    //  // remove this if you are not using it in your app
    //  'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    //}),
    //
    //Do log in here
    //
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
