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

export class EditIdentifiantsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: props.user.infos.firstname,
      lastname: props.user.infos.lastname,
    };

    this.lastnameRef = React.createRef();

    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  onFirstNameChange(firstname) {
    this.setState({
      firstname,
    });
  }

  onLastNameChange(lastname) {
    this.setState({
      lastname,
    });
  }

  validate() {
    const { changeLoginInfos, user } = this.props;
    const { firstname, lastname } = this.state;

    changeLoginInfos(firstname, lastname, user.infos.email);
  }

  render() {
    const { firstname, lastname } = this.state;
    const { loading } = this.props;

    return (
      <View style={styles.container}>
        <CreateHeader title="Identifiants" />
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{ flex: 1 }}
          keyboardVerticalOffset={isIphoneX() ? -20 : 0}
        >
          <View style={styles.scrollView}>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Prénom</Text>
              <RoundInput
                style={styles.roundInput}
                value={firstname}
                onChange={this.onFirstNameChange}
                onSubmitEditing={() => {
                  this.lastnameRef.current.focus();
                }}
                placeholder="Prénom"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.title}>Nom de famille</Text>
              <RoundInput
                ref={this.lastnameRef}
                style={styles.roundInput}
                value={lastname}
                onChange={this.onLastNameChange}
                onSubmitEditing={this.validate}
                returnKeyType="go"
                placeholder="Nom de famille"
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
)(EditIdentifiantsScreen);

EditIdentifiantsScreen.propTypes = {
  loading: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  changeLoginInfos: PropTypes.func.isRequired,
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
    color: theme.colors.grey,
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
