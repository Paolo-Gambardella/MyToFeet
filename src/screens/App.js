import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Root } from '../store/store';
import * as actions from '../actions';

const mapStateToProps = state => ({
  state: state.nav,
  alert: state.alert,
  user: state.user,
});

const AppWithNavigationState = connect(mapStateToProps)(Root);

export class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    const { goBack } = this.props;

    goBack();
    return true;
  };

  render() {
    const { alert } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <AppWithNavigationState />
        {[...alert.alerts]}
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(AppContainer);

AppContainer.propTypes = {
  alert: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
};
