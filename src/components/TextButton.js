import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export const TextButton = ({ text, style, onPress, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { ...style }]}>
        <Text style={{ ...textStyle }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;

TextButton.defaultProps = {
  style: {},
  textStyle: {},
};

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  textStyle: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
