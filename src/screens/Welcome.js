import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import theme from '../theme';
import * as actions from '../actions';
import { Loader } from '../components';

export const mapStateToProps = ({ user, loading, alert }) => ({
  user,
  loading,
  alert,
});

const { width, height } = Dimensions.get('window');

export class WelcomeScreen extends Component {
  componentDidMount() {
    const { user, showApp } = this.props;

    if (user) {
      showApp();
    }
  }

  render() {
    const { user } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={[styles.container]}>
          <Animated.View style={styles.dataContainer}>
            <Animated.View
              style={{ opacity: this.logoOpacity, marginBottom: 20 }}
            ></Animated.View>
            <Animated.View style={{ opacity: this.titleOpacity }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.title}>Bonjour </Text>
                <Text style={styles.name}>{user.infos.firstname}</Text>
              </View>
              <Text style={styles.subTitle}>
                Votre semelle n’attend plus que vous
              </Text>
              <View style={styles.loaderContainer}>
                <Loader color={theme.colors.black} />
              </View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(WelcomeScreen);

WelcomeScreen.propTypes = {
  user: PropTypes.object.isRequired,
  showApp: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    position: 'absolute',
  },
  title: {
    fontFamily: 'circular-medium',
    fontSize: 25,
    color: theme.colors.black,
    textAlign: 'center',
  },
  name: {
    fontFamily: 'circular-medium',
    fontSize: 25,
    color: theme.colors.green,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'circular-medium',
    fontSize: 14,
    color: theme.colors.black,
    textAlign: 'center',
  },
  dataContainer: {
    height: height - 10,
    width,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    elevation: 10,
  },
  loaderContainer: {
    marginTop: 20,
    height: 30,
  },
});
