import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import theme from '../theme';

export class Input extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  focus() {
    this.inputRef.current.focus();
  }

  render() {
    const {
      value,
      onChange,
      placeholder,
      label,
      style,
      keyboardType,
      autoCapitalize,
      secureTextEntry,
      isNotValid,
      isNotValidMessage,
      isValid,
      autoFocus,
      editable,
      returnKeyType,
      onSubmitEditing,
      showChevron,
      showCalendar,
      haveInformationText,
      messageColor,
    } = this.props;

    return (
      <View>
        <TextField
          ref={this.inputRef}
          placeholder={placeholder}
          onChangeText={text => onChange(text)}
          value={value}
          label={label}
          baseColor={theme.colors.grey}
          tintColor={theme.colors.green}
          labelTextStyle={styles.label}
          titleTextStyle={styles.label}
          affixTextStyle={styles.label}
          style={[styles.label, { ...style }]}
          labelHeight={18}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          editable={editable}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        {isNotValid && (
          <Text style={styles.notValidText}>{isNotValidMessage}</Text>
        )}
        {haveInformationText && (
          <Text style={[styles.notValidText, { color: messageColor }]}>
            {isNotValidMessage}
          </Text>
        )}
        {isNotValid && (
          <AntDesign
            name="close"
            size={20}
            color={theme.colors.alertRed}
            style={styles.notValidIcon}
          />
        )}
        {isValid && (
          <AntDesign
            name="check"
            size={20}
            color={theme.colors.alertGreen}
            style={styles.validIcon}
          />
        )}
        {showChevron && (
          <EvilIcons
            name="chevron-down"
            size={24}
            color={theme.colors.grey}
            style={styles.chevronIcon}
          />
        )}
        {showCalendar && (
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={theme.colors.grey}
            style={styles.chevronCalendar}
          />
        )}
      </View>
    );
  }
}

export default Input;

Input.defaultProps = {
  style: {},
  placeholder: '',
  keyboardType: 'default',
  autoCapitalize: 'none',
  secureTextEntry: false,
  isNotValid: false,
  isNotValidMessage: '',
  isValid: false,
  autoFocus: false,
  editable: true,
  returnKeyType: 'next',
  onSubmitEditing: null,
  showChevron: false,
  showCalendar: false,
  haveInformationText: false,
  messageColor: theme.colors.grey,
};

Input.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  isNotValid: PropTypes.bool,
  isNotValidMessage: PropTypes.string,
  isValid: PropTypes.bool,
  autoFocus: PropTypes.bool,
  editable: PropTypes.bool,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  showChevron: PropTypes.bool,
  showCalendar: PropTypes.bool,
  haveInformationText: PropTypes.bool,
  messageColor: PropTypes.string,
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'circular-book',
    fontSize: 16,
    height: 50,
    paddingBottom: 25,
  },
  notValidText: {
    fontFamily: 'circular-medium',
    fontSize: 12,
    color: theme.colors.alertRed,
    top: -4,
    alignSelf: 'flex-end',
  },
  notValidIcon: {
    top: 22,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  validIcon: {
    top: 22,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  chevronIcon: {
    top: 25,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  chevronCalendar: {
    top: 23,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
