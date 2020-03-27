import React, { Component } from 'react';
import './src/i18n/config';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { store } from './src/store/store';
import AppContainer from './src/screens/App';

console.disableYellowBox = true;

export class App extends Component {
  constructor() {
    super();

    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'circular-black': require('./assets/fonts/circular-black.otf'),
      'circular-bold': require('./assets/fonts/circular-bold.otf'),
      'circular-book': require('./assets/fonts/circular-book.otf'),
      'circular-medium': require('./assets/fonts/circular-medium.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    return fontLoaded ? (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppContainer />
      </Provider>
    ) : null;
  }
}

export default App;
