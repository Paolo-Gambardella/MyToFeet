import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Platform } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import { BackButton } from './BackButton';
import theme from '../theme';
import * as actions from '../actions';

export const mapStateToProps = ({ user }) => ({
  user,
});

const { width } = Dimensions.get('window');

export class CreateHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    const { goBack } = this.props;

    goBack();
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <BackButton onPress={this.goBack} iconColor={theme.colors.green} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(CreateHeader);

CreateHeader.defaultProps = {
  title: '',
};

CreateHeader.propTypes = {
  title: PropTypes.string,
  goBack: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width,
    ...ifIphoneX(
      {
        height: 85,
        paddingTop: 35,
      },
      {
        height: Platform.OS === 'ios' ? 60 : Constants.statusBarHeight + 60,
        paddingTop: Platform.OS === 'ios' ? 15 : Constants.statusBarHeight,
      }
    ),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  title: {
    fontFamily: 'circular-bold',
    fontSize: RFPercentage(3),
    color: theme.colors.black,
    paddingLeft: 10,
  },
});
