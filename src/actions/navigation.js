/* eslint-disable import/prefer-default-export */
import { NavigationActions } from 'react-navigation';

export const goBack = () => dispatch => {
  dispatch(NavigationActions.back());
};

export const changeScreen = route => dispatch => {
  const navigateAction = NavigationActions.navigate({
    routeName: route,
    params: {},
  });
  dispatch(navigateAction);
};
