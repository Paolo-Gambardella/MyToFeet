import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Loader from './Loader';

export const RoundButton = ({
  loading,
  text,
  style,
  onPress,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[styles.container, { ...style, opacity: disabled ? 0.6 : 1 }]}
      >
        {!loading ? (
          <Text style={{ ...textStyle }} numberOfLines={1}>
            {text}
          </Text>
        ) : (
          <Loader />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;

RoundButton.defaultProps = {
  loading: false,
  style: {},
  textStyle: {},
  disabled: false,
};

RoundButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
