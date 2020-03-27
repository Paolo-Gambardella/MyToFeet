import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationEvents } from 'react-navigation';

export class AnimatedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.animatedPosition = new Animated.Value(-50);
    this.animatedOpacity = new Animated.Value(0);

    this.willFocus = this.willFocus.bind(this);
    this.didFocus = this.didFocus.bind(this);
  }

  componentDidMount() {
    this.animatePage();
  }

  animatePage() {
    Animated.parallel([
      Animated.timing(this.animatedPosition, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(this.animatedOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }

  willFocus(payload) {
    if (
      payload.action.type !== 'Navigation/BACK' &&
      !payload.action.preserveFocus
    ) {
      this.animatedPosition.setValue(-50);
      this.animatedOpacity.setValue(0);
    }
  }

  didFocus() {
    this.animatePage();
  }

  render() {
    const { style, children } = this.props;

    return (
      <Animated.View
        style={[
          { ...style },
          {
            opacity: this.animatedOpacity,
            transform: [{ translateX: this.animatedPosition }],
          },
        ]}
      >
        <NavigationEvents
          onWillFocus={this.willFocus}
          onDidFocus={this.didFocus}
        />
        {children}
      </Animated.View>
    );
  }
}

export default AnimatedScreen;

AnimatedScreen.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any.isRequired,
};
