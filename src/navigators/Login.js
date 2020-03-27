import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login';
import LostPasswordScreen from '../screens/LostPassword';
import WelcomeNavigator from './Welcome';

const LoginRouteConfigs = {
  Main: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  LostPassword: {
    screen: LostPasswordScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Welcome: {
    screen: WelcomeNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },
};

const LoginNavigator = createStackNavigator(LoginRouteConfigs, {
  mode: 'modal',
  headerMode: 'none',
});

export default LoginNavigator;
