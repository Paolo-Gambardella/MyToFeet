import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import theme from '../theme';
import * as actions from '../actions';
import { Input, RoundButton, CreateHeader } from '../components';

export const mapStateToProps = ({ loading }) => ({
  loading,
});

// eslint-disable-next-line react/prop-types
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.firstnameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();

    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.goBack = this.goBack.bind(this);
    this.register = this.register.bind(this);
    this.isValidData = this.isValidData.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.isSamePassword = this.isSamePassword.bind(this);
  }

  onChangeLastname(lastname) {
    this.setState({
      lastname,
    });
  }

  onChangeFirstname(firstname) {
    this.setState({
      firstname,
    });
  }

  onChangeEmail(email) {
    this.setState({
      email,
    });
  }

  onChangePassword(password) {
    this.setState({
      password,
    });
  }

  onChangeConfirmPassword(confirmPassword) {
    this.setState({
      confirmPassword,
    });
  }

  goBack() {
    const { navigation } = this.props;

    navigation.navigate('Login');
  }

  isValidData() {
    const { lastname, firstname } = this.state;

    if (lastname.length > 0) {
      this.validLastname = true;
      this.notValidLastname = false;
    } else {
      this.validLastname = false;
      this.notValidLastname = true;
    }
    if (firstname.length > 0) {
      this.validFirstname = true;
      this.notValidFirstname = false;
    } else {
      this.validFirstname = false;
      this.notValidFirstname = true;
    }
    if (this.isValidEmail()) {
      this.validEmail = true;
      this.notValidEmail = false;
    } else {
      this.validEmail = false;
      this.notValidEmail = true;
    }
    if (this.isSamePassword()) {
      this.validPasswords = true;
      this.notValidPasswords = false;
    } else {
      this.validPasswords = false;
      this.notValidPasswords = true;
    }
    if (
      this.validLastname &&
      this.validFirstname &&
      this.validEmail &&
      this.validPasswords
    ) {
      return true;
    }
    return false;
  }

  isValidEmail() {
    const { email } = this.state;

    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
      return true;
    }
    return false;
  }

  isSamePassword() {
    const { password, confirmPassword } = this.state;

    if (
      password === confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      return true;
    }
    return false;
  }

  register() {
    const { lastname, firstname, email, password } = this.state;
    const { register } = this.props;

    this.passwordRef.current.focus();
    Keyboard.dismiss();
    if (this.isValidData()) {
      register(lastname, firstname, email, password);
      return true;
    }
    this.forceUpdate();
    return false;
  }

  render() {
    const {
      lastname,
      firstname,
      email,
      password,
      confirmPassword,
    } = this.state;
    const { loading } = this.props;

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <CreateHeader />
          <KeyboardAvoidingView
            style={styles.dataContainer}
            behavior="padding"
            enabled
          >
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 20, justifyContent: 'center',
              }}
              showsVerticalScrollIndicator={false}
              style={styles.inputContainer}
            >
              <View style={styles.topContainer}>
                <Text style={styles.connectTitle}>
                  {i18n.t('createAccount')}
                </Text>
              </View>
              <Input
                value={lastname}
                onChange={this.onChangeLastname}
                label="Nom"
                onSubmitEditing={() => {
                  this.firstnameRef.current.focus();
                }}
                isNotValid={this.notValidFirstname}
                isValid={this.validFirstname}
                isNotValidMessage={i18n.t('emptyInput')}
              />
              <Input
                ref={this.firstnameRef}
                value={firstname}
                onChange={this.onChangeFirstname}
                label="Prénom"
                onSubmitEditing={() => {
                  this.emailRef.current.focus();
                }}
                isNotValid={this.notValidFirstname}
                isValid={this.validFirstname}
                isNotValidMessage={i18n.t('emptyInput')}
              />
              <Input
                ref={this.emailRef}
                value={email}
                onChange={this.onChangeEmail}
                label="Email"
                onSubmitEditing={() => {
                  this.passwordRef.current.focus();
                }}
                isNotValid={this.notValidEmail}
                isValid={this.validEmail}
                isNotValidMessage={i18n.t('notValidEmail')}
              />
              <Input
                ref={this.passwordRef}
                value={password}
                onChange={this.onChangePassword}
                label="Mot de passe"
                secureTextEntry
                onSubmitEditing={() => {
                  this.confirmPasswordRef.current.focus();
                }}
                isNotValid={this.notValidPasswords}
                isValid={this.validPasswords}
                isNotValidMessage={i18n.t('notSamePassword')}
              />
              <BarPasswordStrengthDisplay password={password} />
              <Input
                ref={this.confirmPasswordRef}
                value={confirmPassword}
                onChange={this.onChangeConfirmPassword}
                label="Confirmez le mot de passe"
                secureTextEntry
                onSubmitEditing={this.register}
                returnKeyType="go"
                isNotValid={this.notValidPasswords}
                isValid={this.validPasswords}
                isNotValidMessage={i18n.t('notSamePassword')}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <RoundButton
                text={i18n.t('inscription')}
                style={styles.loginButton}
                textStyle={styles.loginText}
                onPress={this.register}
                loading={loading.login}
                disabled={loading.login}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </DismissKeyboard>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(RegisterScreen);

RegisterScreen.propTypes = {
  loading: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    flex: 1,
    width: 250,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loginButton: {
    backgroundColor: theme.colors.green,
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginText: {
    fontFamily: 'circular-medium',
    color: theme.colors.white,
    fontSize: 18,
  },
  connectTitle: {
    fontFamily: 'circular-medium',
    color: theme.colors.green,
    fontSize: 18,
    marginTop: 5,
  },
});
