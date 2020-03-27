import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Home';
import LoginNavigator from './Login';
import RegisterNavigator from './Register';

const NotLoggedRouteConfigs = {
  Main: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Login: {
    screen: LoginNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Register: {
    screen: RegisterNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
};

const NotLoggedNavigator = createStackNavigator(NotLoggedRouteConfigs);

export default NotLoggedNavigator;
