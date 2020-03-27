/* eslint-disable radix */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { RFPercentage } from 'react-native-responsive-fontsize';
import theme from '../theme';

const getDecimal = (number, showOperator) => {
  const tmp = parseFloat(number - parseInt(number)).toFixed(2);
  let result;

  if (showOperator) {
    result = tmp.toString().substr(number < 0 ? 3 : 2);
  } else {
    result = tmp.toString().substr(number < 0 ? 3 : 2);
  }

  if (result === '0') {
    return '00';
  }
  return result;
};

const numberToString = (number, showOperator) => {
  if (showOperator) {
    return number >= 0
      ? `+${numberWithSpaces(parseInt(number))},`
      : `${numberWithSpaces(parseInt(number))},`;
  }
  return number >= 0
    ? `${numberWithSpaces(parseInt(number))},`
    : `${numberWithSpaces(parseInt(number))},`;
};

const numberWithSpaces = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const NumberFormater = ({
  number,
  fontSize,
  color,
  showEuro,
  showOperator,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.number, { fontSize, color }]}>
        {numberToString(number, showOperator)}
      </Text>
      <Text
        style={[styles.number, { fontSize: fontSize - 3, color, marginTop: 2 }]}
      >
        {getDecimal(number, showOperator)}
      </Text>
      {showEuro && (
        <Text
          style={[styles.number, { fontSize, color, marginLeft: fontSize / 7 }]}
        >
          €
        </Text>
      )}
    </View>
  );
};

export default NumberFormater;

NumberFormater.defaultProps = {
  fontSize: RFPercentage(2.5),
  color: theme.colors.alertGreen,
  showEuro: true,
  showOperator: true,
};

NumberFormater.propTypes = {
  number: PropTypes.number.isRequired,
  fontSize: PropTypes.any,
  color: PropTypes.string,
  showEuro: PropTypes.bool,
  showOperator: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontFamily: 'circular-medium',
  },
});
