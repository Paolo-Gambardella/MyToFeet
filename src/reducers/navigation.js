import { createNavigationReducer } from 'react-navigation-redux-helpers';
import AppNavigator from '../navigators/Start';

const navigation = createNavigationReducer(AppNavigator);

export default navigation;
