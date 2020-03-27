import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/Welcome';

const WelcomeRouteConfigs = {
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
};

const WelcomeNavigator = createStackNavigator(WelcomeRouteConfigs, {
  mode: 'modal',
  headerMode: 'none',
});

export default WelcomeNavigator;
