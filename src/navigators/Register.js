import { createStackNavigator } from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';
import RegisterScreen from '../screens/Register';

const handleCustomTransition = () => {
  return fromRight();
};

const RegisterRouteConfigs = {
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
};

const RegisterNavigator = createStackNavigator(RegisterRouteConfigs, {
  transitionConfig: () => handleCustomTransition(),
});

export default RegisterNavigator;
