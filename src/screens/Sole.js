import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import { AnimatedScreen, Header, RoundButton } from '../components';
import theme from '../theme';
import FootLeft from '../../assets/svg/footLeft';
import FootRight from '../../assets/svg/footRight';

const mapStateToProps = ({ user, loading, analyse }) => ({
  user,
  loading,
  analyse,
});

export class SoleScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      testing: false,
    };
    this.handlePressing = this.handlePressing.bind(this);
    this.onTestingChange = this.onTestingChange.bind(this);
  }

  onTestingChange(value) {
    this.setState({ testing: value });
  }

  handlePressing() {
    const { analyse, missingDataWalkError } = this.props;

    let index = 0;

    if (analyse.dataWalk) {
      this.onTestingChange(true);
      const loop = setInterval(() => {
        if (index === analyse.dataWalk['sensor-lh'].length - 1) {
          this.onTestingChange(false);
          clearInterval(loop);
        }
        const tmp = {};
        tmp.sensor_lh = this.getDataColor(
          analyse.dataWalk['sensor-lh'][index].v || 0
        );
        tmp.sensor_lm = this.getDataColor(
          analyse.dataWalk['sensor-lm'][index].v || 0
        );
        tmp.sensor_lf = this.getDataColor(
          analyse.dataWalk['sensor-lf'][index].v || 0
        );
        tmp.sensor_rh = this.getDataColor(
          analyse.dataWalk['sensor-rh'][index].v || 0
        );
        tmp.sensor_rm = this.getDataColor(
          analyse.dataWalk['sensor-rm'][index].v || 0
        );
        tmp.sensor_rf = this.getDataColor(
          analyse.dataWalk['sensor-rf'][index].v || 0
        );
        this.setState({
          data: tmp,
        });
        index += 1;
      }, 50);
    } else missingDataWalkError();
  }

  getDataColor(value) {
    if (value === 0) return theme.colors.white;
    if (value > 0 && value <= 0.33) return theme.colors.alertGreen;
    if (value > 0.33 && value <= 0.66) return theme.colors.alertOrange;
    return theme.colors.alertRed;
  }

  render() {
    const { navigation } = this.props;
    const { data, testing } = this.state;

    return (
      <AnimatedScreen style={styles.container}>
        <Header title="Semelle" navigation={navigation} />
        <View style={styles.container}>
          <View style={styles.feetContainer}>
            <FootLeft
              height={328}
              width={122}
              color={theme.colors.black}
              sensor_h={data.sensor_lh || theme.colors.white}
              sensor_m={data.sensor_lm || theme.colors.white}
              sensor_f={data.sensor_lf || theme.colors.white}
            />
            <View style={{ height: 100, width: 20 }}></View>
            <FootRight
              height={328}
              width={122}
              color={theme.colors.black}
              sensor_h={data.sensor_rh || theme.colors.white}
              sensor_m={data.sensor_rm || theme.colors.white}
              sensor_f={data.sensor_rf || theme.colors.white}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <RoundButton
              text="Tester la semelle"
              style={styles.validateButton}
              textStyle={styles.validateText}
              onPress={this.handlePressing}
              loading={testing}
              disabled={testing}
            />
          </View>
        </View>
      </AnimatedScreen>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(SoleScreen);

SoleScreen.propTypes = {
  analyse: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  missingDataWalkError: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  feetContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    paddingVertical: 20,
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
});
