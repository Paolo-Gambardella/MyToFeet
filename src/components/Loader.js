import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../theme';

export const Loader = ({ size, color }) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Loader;

Loader.defaultProps = {
  size: 'small',
  color: theme.colors.white,
};

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
