import { createStackNavigator } from 'react-navigation';
import { fromRight, fadeIn } from 'react-navigation-transitions';
import LoggedContainerNavigator from './LoggedContainer';
import NotLoggedNavigator from './NotLogged';

const handleCustomTransition = ({ scenes }) => {
  const nextScene = scenes[scenes.length - 1];

  if (nextScene.route.routeName === 'Logged') {
    return fadeIn(1400);
  }
  return fromRight();
};

const AppRouteConfigs = {
  NotLogged: {
    screen: NotLoggedNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Logged: {
    screen: LoggedContainerNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },
};

const AppNavigator = createStackNavigator(AppRouteConfigs, {
  transitionConfig: nav => handleCustomTransition(nav),
});

export default AppNavigator;
