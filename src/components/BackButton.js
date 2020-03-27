import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

export const BackButton = ({ style, onPress, iconColor }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { ...style }]}>
        <Ionicons name="ios-arrow-back" size={28} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

BackButton.defaultProps = {
  style: {},
  iconColor: theme.colors.black,
};

BackButton.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  iconColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
