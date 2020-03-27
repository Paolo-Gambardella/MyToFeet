import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AnalyseScreen from '../screens/Analyse';
import SoleScreen from '../screens/Sole';
import MenuScreen from '../screens/Menu';
import theme from '../theme';
import PerformancesGrey from '../../assets/svg/icons/performances';
import FootLeft from '../../assets/svg/footLeft';
import MenuIcon from '../../assets/svg/icons/menu';
import FootRight from '../../assets/svg/footRight';

const LoggedRouteConfigs = {
  Analyse: {
    screen: AnalyseScreen,
    navigationOptions: () => ({
      header: null,
      tabBarLabel: 'Analyse',
      tabBarIcon: ({ focused }) => (
        <PerformancesGrey
          height={18}
          width={18}
          color={focused ? theme.colors.green : theme.colors.grey}
        />
      ),
    }),
  },
  Sole: {
    screen: SoleScreen,
    navigationOptions: () => ({
      header: null,
      tabBarLabel: 'Semelle',
      tabBarIcon: ({ focused }) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FootLeft
            height={25}
            width={10}
            color={focused ? theme.colors.green : theme.colors.grey}
            sensor_h={focused ? theme.colors.green : theme.colors.grey}
            sensor_m={focused ? theme.colors.green : theme.colors.grey}
            sensor_f={focused ? theme.colors.green : theme.colors.grey}
          />
          <View style={{ height: 1, width: 2 }}></View>
          <FootRight
            height={25}
            width={10}
            color={focused ? theme.colors.green : theme.colors.grey}
            sensor_h={focused ? theme.colors.green : theme.colors.grey}
            sensor_m={focused ? theme.colors.green : theme.colors.grey}
            sensor_f={focused ? theme.colors.green : theme.colors.grey}
          />
        </View>
      ),
    }),
  },
  Menu: {
    screen: MenuScreen,
    navigationOptions: () => ({
      header: null,
      tabBarLabel: 'Menu',
      tabBarIcon: ({ focused }) => (
        <MenuIcon
          height={21 * 1.4}
          width={19}
          color={focused ? theme.colors.green : theme.colors.grey}
        />
      ),
    }),
  },
};

const LoggedNavigator = createBottomTabNavigator(LoggedRouteConfigs, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  header: true,
  tabBarOptions: {
    style: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: theme.colors.veryLightGrey,
      ...ifIphoneX(
        {
          paddingBottom: 15,
        },
        {
          paddingBottom: 0,
        }
      ),
    },
    allowFontScaling: true,
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
    activeTintColor: theme.colors.green,
    inactiveTintColor: theme.colors.grey,
    labelStyle: {
      fontFamily: 'circular-medium',
      fontSize: RFPercentage(1.2),
      marginTop: 4,
    },
    upperCaseLabel: false,
    showIcon: true,
  },
});

export default LoggedNavigator;
