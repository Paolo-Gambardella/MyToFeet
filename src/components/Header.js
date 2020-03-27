import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { connect } from 'react-redux';
import theme from '../theme';
import * as actions from '../actions';

export const mapStateToProps = ({ user }) => ({
  user,
});

const { width } = Dimensions.get('window');

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(Header);

Header.defaultProps = {};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 20,
    ...ifIphoneX(
      {
        paddingTop: 40,
      },
      {
        paddingTop: Platform.OS === 'ios' ? 15 : Constants.statusBarHeight + 15,
      }
    ),
  },
  topContainer: {
    height: 60,
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'circular-bold',
    fontSize: theme.fontSizes.primaryHeader,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  leftIcon: {
    marginRight: 10,
  },
  accountContainer: {
    paddingTop: 8,
  },
});
