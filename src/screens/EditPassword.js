import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import moment from 'moment';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import * as actions from '../actions';
import { CreateHeader, RoundInput, RoundButton } from '../components';
import theme from '../theme';

import 'moment/locale/fr';

moment.locale('fr');

export const mapStateToProps = ({ user, loading }) => ({
  user,
  loading,
});

const { width } = Dimensions.get('window');

export class EditPasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      rePassword: '',
      error: 0,
    };

    this.rePasswordRef = React.createRef();

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRePasswordChange = this.onRePasswordChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  onPasswordChange(password) {
    this.setState({
      password,
    });
  }

  onRePasswordChange(rePassword) {
    this.setState({
      rePassword,
    });
  }

  validate() {
    const { changePassword } = this.props;
    const { password, rePassword } = this.state;

    if (password === rePassword && password !== '') {
      changePassword(password);
      return;
    }
    this.setState({ error: 1 });
  }

  render() {
    const { password, rePassword, error } = this.state;
    const { loading } = this.props;

    return (
      <View style={styles.container}>
        <CreateHeader title="Mot de passe" />
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{ flex: 1 }}
          keyboardVerticalOffset={isIphoneX() ? -20 : 0}
        >
          <View style={styles.scrollView}>
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      error === 0 ? theme.colors.grey : theme.colors.alertRed,
                  },
                ]}
              >
                {error === 0
                  ? 'Nouveau mot de passe'
                  : 'Les mots de passe ne correspondent pas'}
              </Text>
              <RoundInput
                style={styles.roundInput}
                value={password}
                onChange={this.onPasswordChange}
                secureTextEntry
                onSubmitEditing={() => {
                  this.rePasswordRef.current.focus();
                }}
                placeholder="Mot de passe"
              />
              <View style={{ width: width - 40 }}>
                <BarPasswordStrengthDisplay
                  width={width - 60}
                  password={password}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      error === 0 ? theme.colors.grey : theme.colors.alertRed,
                  },
                ]}
              >
                {error === 0
                  ? 'Confirmez le mot de passe'
                  : 'Les mots de passe ne correspondent pas'}
              </Text>
              <RoundInput
                ref={this.rePasswordRef}
                style={styles.roundInput}
                value={rePassword}
                onChange={this.onRePasswordChange}
                secureTextEntry
                onSubmitEditing={this.validate}
                returnKeyType="go"
                placeholder="Confirmez le mot de passe"
              />
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <RoundButton
              onPress={this.validate}
              text={i18n.t('validate')}
              style={styles.validateButton}
              textStyle={styles.validateText}
              loading={loading.changeLoginInfos}
              disabled={loading.changeLoginInfos}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(EditPasswordScreen);

EditPasswordScreen.propTypes = {
  loading: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 25,
    alignItems: 'flex-start',
  },
  roundInput: {
    width: width - 40,
    height: 40,
  },
  buttonsContainer: {
    alignItems: 'center',
    ...ifIphoneX(
      {
        paddingBottom: 40,
      },
      {
        paddingBottom: 20,
      }
    ),
    paddingTop: 20,
  },
  validateButton: {
    backgroundColor: theme.colors.green,
    width: 200,
  },
  validateText: {
    fontFamily: 'circular-medium',
    color: theme.colors.white,
    fontSize: 18,
  },
  title: {
    fontFamily: 'circular-book',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 13,
  },
  calendarIcon: {
    top: 10,
    right: 15,
    position: 'absolute',
  },
  markerIcon: {
    top: 10,
    right: 13,
    position: 'absolute',
  },
  operationContainer: {
    height: 50,
    width,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.veryLightGrey,
    justifyContent: 'center',
  },
  operationText: {
    fontFamily: 'circular-medium',
    fontSize: 15,
    color: theme.colors.black,
  },
  categoryButton: {
    maxWidth: width / 1.5,
  },
  categoryButtonText: {
    fontFamily: 'circular-medium',
    fontSize: 15,
    color: theme.colors.black,
  },
  coverContainer: {
    width: width - 40,
    alignItems: 'center',
  },
  tvaButton: {
    height: 40,
    borderWidth: 1,
    marginRight: 12,
  },
  tvaButtonText: {
    fontFamily: 'circular-medium',
    fontSize: 15,
  },
  tvaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconsContainer: {
    marginTop: 25,
    width: width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontFamily: 'circular-medium',
    color: theme.colors.black,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  fileModalContainer: {
    height: 50,
    width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.veryLightGrey,
  },
  fileModalText: {
    fontFamily: 'circular-book',
    color: theme.colors.black,
    fontSize: 16,
  },
});
