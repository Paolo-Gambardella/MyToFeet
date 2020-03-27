import { createStackNavigator } from 'react-navigation';
import { fromRight, fromBottom } from 'react-navigation-transitions';
import LoggedNavigator from './Logged';
import EditIdentifiantsScreen from '../screens/EditIdentifiants';
import AboutScreen from '../screens/About';
import EditEmailScreen from '../screens/EditEmail';
import EditPasswordScreen from '../screens/EditPassword';

const handleCustomTransition = ({ scenes }) => {
  const nextScene = scenes[scenes.length - 1];

  if (nextScene.route.routeName === 'BankAccount') {
    return fromBottom();
  }
  return fromRight();
};

const LoggedContainerRouteConfigs = {
  LoggedNavigator: {
    screen: LoggedNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },
  EditIdentifiants: {
    screen: EditIdentifiantsScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  About: {
    screen: AboutScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  EditPassword: {
    screen: EditPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  EditEmail: {
    screen: EditEmailScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
};

const LoggedContainerNavigator = createStackNavigator(
  LoggedContainerRouteConfigs,
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default LoggedContainerNavigator;
