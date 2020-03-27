import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';
import theme from '../theme';
import * as actions from '../actions';
import { Input, RoundButton, TextButton } from '../components';
import { getLogin } from '../utils/LocalStorage';

// eslint-disable-next-line react/prop-types
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const mapStateToProps = ({ loading }) => ({
  loading,
});

export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.passwordRef = React.createRef();

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.goToRegisterScreen = this.goToRegisterScreen.bind(this);
    this.goToLostPasswordScreen = this.goToLostPasswordScreen.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    const data = await getLogin('login');
    this.onChangeEmail(data.email);
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

  goToRegisterScreen() {
    const { navigation } = this.props;

    navigation.navigate('Register');
  }

  goToLostPasswordScreen() {
    const { navigation } = this.props;

    navigation.navigate('LostPassword');
  }

  login() {
    const { email, password } = this.state;
    const { login } = this.props;

    this.passwordRef.current.focus();
    Keyboard.dismiss();
    login(email, password);
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.dataContainer}
            behavior="position"
            enabled
          >
            <View style={styles.topContainer}>
              <Image
                style={{
                  width: 300,
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../../assets/2020_logo_ToFeet.png')}
              />
            </View>
            <View style={styles.dataView}>
              <Input
                value={email}
                onChange={this.onChangeEmail}
                label="Adresse email"
                onSubmitEditing={() => {
                  this.passwordRef.current.focus();
                }}
              />
              <Input
                ref={this.passwordRef}
                value={password}
                onChange={this.onChangePassword}
                label="Mot de passe"
                secureTextEntry
                onSubmitEditing={this.login}
                returnKeyType="go"
              />
              <TextButton
                text={i18n.t('lostPassword')}
                style={styles.lostPasswordButton}
                textStyle={styles.lostPasswordText}
                onPress={this.goToLostPasswordScreen}
              />
              <RoundButton
                text={i18n.t('connexion')}
                style={styles.loginButton}
                textStyle={styles.loginText}
                onPress={this.login}
                loading={loading.login}
                disabled={loading.login}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.noAccountContainer}>
            <Text style={styles.noAccountText}>{i18n.t('noAccount')}</Text>
            <TextButton
              text={i18n.t('register')}
              style={styles.noAccountButton}
              textStyle={styles.noAccountButtonText}
              onPress={this.goToRegisterScreen}
            />
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(LoginScreen);

LoginScreen.propTypes = {
  loading: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  dataView: {
    width: 250,
    paddingBottom: 20,
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: theme.colors.green,
    width: 200,
    alignSelf: 'center',
    marginTop: 50,
  },
  loginText: {
    fontFamily: 'circular-medium',
    color: theme.colors.white,
    fontSize: 18,
  },
  lostPasswordButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  lostPasswordText: {
    fontFamily: 'circular-medium',
    color: theme.colors.grey,
    fontSize: 13,
  },
  noAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...ifIphoneX(
      {
        paddingBottom: 45,
      },
      {
        paddingBottom: 25,
      }
    ),
  },
  noAccountText: {
    fontFamily: 'circular-medium',
    color: theme.colors.grey,
    fontSize: 13,
  },
  noAccountButton: {
    fontFamily: 'circular-medium',
    paddingHorizontal: 3,
    paddingVertical: 0,
  },
  noAccountButtonText: {
    fontFamily: 'circular-medium',
    color: theme.colors.green,
    fontSize: 13,
  },
  connectTitle: {
    fontFamily: 'circular-medium',
    color: theme.colors.black,
    fontSize: 18,
    marginTop: 5,
  },
  logoContainer: {
    alignItems: 'center',
  },
});
