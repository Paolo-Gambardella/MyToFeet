import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import theme from '../theme';
import { Input, RoundButton, CreateHeader } from '../components';
import ForgotPassword from '../../assets/svg/forgotPassword';
import { getIllustrationWidth } from '../utils/Utils';

export const mapStateToProps = ({ loading }) => ({
  loading,
});

const { height } = Dimensions.get('window');

// eslint-disable-next-line react/prop-types
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export class LostPasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      illustrationWidth: getIllustrationWidth(),
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.goBack = this.goBack.bind(this);
    this.lostPassword = this.lostPassword.bind(this);
  }

  onChangeEmail(email) {
    this.setState({
      email,
    });
  }

  goBack() {
    const { navigation } = this.props;

    navigation.goBack();
  }

  lostPassword() {
    const { email } = this.state;
    const { forgotPassword } = this.props;

    forgotPassword(email);
  }

  render() {
    const { email, illustrationWidth } = this.state;
    const { loading } = this.props;

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <CreateHeader />
          <KeyboardAvoidingView
            style={styles.dataContainer}
            behavior="height"
            enabled
          >
            <View style={styles.illustrationContainer}>
              <ForgotPassword
                height={(illustrationWidth * 1.26).toString()}
                width={illustrationWidth}
              />
            </View>
            <View style={styles.dataView}>
              <Text style={styles.connectTitle}>{i18n.t('lostPassword')}</Text>
              <Input
                value={email}
                onChange={this.onChangeEmail}
                label="Adresse email"
                onSubmitEditing={this.lostPassword}
                returnKeyType="send"
              />
            </View>
            <View style={styles.buttonsContainer}>
              <RoundButton
                text={i18n.t('send')}
                style={styles.continueButton}
                textStyle={styles.continueText}
                onPress={this.lostPassword}
                loading={loading.forgotPassword}
                disabled={loading.forgotPassword}
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
)(LostPasswordScreen);

LostPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dataContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'flex-start',
  },
  dataView: {
    flex: 2,
    width: 250,
    paddingBottom: 30,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  connectTitle: {
    fontFamily: 'circular-medium',
    color: theme.colors.black,
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: theme.colors.green,
    width: 200,
  },
  continueText: {
    fontFamily: 'circular-medium',
    color: theme.colors.white,
    fontSize: 17,
  },
  buttonsContainer: {
    alignItems: 'center',
    ...ifIphoneX(
      {
        paddingBottom: height / 20 + 20,
      },
      {
        paddingBottom: height / 20,
      }
    ),
  },
});
