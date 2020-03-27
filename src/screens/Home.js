import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native';
import i18n from 'i18n-js';
import Swiper from 'react-native-swiper';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';
import theme from '../theme';
import { RoundButton, TextButton } from '../components';
import Slide1 from '../../assets/svg/slider/slide1';
import Slide2 from '../../assets/svg/slider/slide2';
import Slide3 from '../../assets/svg/slider/slide3';
import Slide4 from '../../assets/svg/slider/slide4';
import { getIllustrationWidth } from '../utils/Utils';

const { width, height } = Dimensions.get('window');

export class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const illustrationWidth = getIllustrationWidth();

    this.slides = [
      {
        text: i18n.t('homeSlider1'),
        background: (
          <Slide1
            width={illustrationWidth}
            height={(illustrationWidth * 1.26).toString()}
          />
        ),
      },
      {
        text: i18n.t('homeSlider2'),
        background: (
          <Slide2
            width={illustrationWidth}
            height={(illustrationWidth * 1.26).toString()}
          />
        ),
      },
      {
        text: i18n.t('homeSlider3'),
        background: (
          <Slide3
            width={illustrationWidth}
            height={(illustrationWidth * 1.26).toString()}
          />
        ),
      },
      {
        text: i18n.t('homeSlider4'),
        background: (
          <Slide4
            width={illustrationWidth}
            height={(illustrationWidth * 1.26).toString()}
          />
        ),
      },
    ];

    this.dots = [
      {
        colorValue: new Animated.Value(1),
      },
      {
        colorValue: new Animated.Value(0),
      },
      {
        colorValue: new Animated.Value(0),
      },
      {
        colorValue: new Animated.Value(0),
      },
    ];

    this.goToLoginScreen = this.goToLoginScreen.bind(this);
    this.goToRegisterScreen = this.goToRegisterScreen.bind(this);
    this.handleChangeSlide = this.handleChangeSlide.bind(this);
  }

  handleChangeSlide(event, state) {
    this.animateDots(state.index);
  }

  animateDots(newIndex) {
    const tmpAnimations = [];

    for (let i = 0; i < this.dots.length; i += 1) {
      if (newIndex !== i) {
        tmpAnimations.push(
          Animated.timing(this.dots[i].colorValue, {
            toValue: 0,
            duration: 200,
          })
        );
      } else {
        tmpAnimations.push(
          Animated.timing(this.dots[i].colorValue, {
            toValue: 1,
            duration: 200,
          })
        );
      }
    }
    Animated.parallel(tmpAnimations).start();
  }

  goToLoginScreen() {
    const { navigation } = this.props;

    navigation.navigate('Login');
  }

  goToRegisterScreen() {
    const { navigation } = this.props;

    navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          containerStyle={{ flex: 1 }}
          showsPagination={false}
          onMomentumScrollEnd={this.handleChangeSlide}
        >
          {this.slides.map((elem, index) => (
            <View key={`slide-${index}`} style={styles.slideContainer}>
              {elem.background}
              <View style={styles.slideTextContainer}>
                <Text style={styles.slideText}>{elem.text}</Text>
              </View>
            </View>
          ))}
        </Swiper>
        <View style={styles.dotsContainer}>
          {this.dots.map((elem, index) => (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                {
                  backgroundColor: elem.colorValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [theme.colors.lightGrey, theme.colors.green],
                  }),
                },
              ]}
            ></Animated.View>
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <RoundButton
            text={i18n.t('inscription')}
            style={styles.inscriptionButton}
            textStyle={styles.inscriptionText}
            onPress={this.goToRegisterScreen}
          />
          <TextButton
            text={i18n.t('connexion')}
            style={styles.connexionButton}
            textStyle={styles.connexionText}
            onPress={this.goToLoginScreen}
          />
        </View>
      </View>
    );
  }
}

export default HomeScreen;

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
  },
  inscriptionButton: {
    backgroundColor: theme.colors.green,
    width: 200,
  },
  inscriptionText: {
    fontFamily: 'circular-medium',
    color: theme.colors.white,
    fontSize: 18,
  },
  connexionButton: {
    marginTop: 7,
  },
  connexionText: {
    fontFamily: 'circular-medium',
    color: theme.colors.grey,
    fontSize: 18,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: height / 20,
  },
  slideTextContainer: {
    width,
    alignItems: 'center',
  },
  slideText: {
    fontFamily: 'circular-medium',
    color: theme.colors.black,
    fontSize: 20,
    width: 200,
    textAlign: 'center',
  },
  dotsContainer: {
    width,
    height: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 14,
    width: 14,
    borderRadius: 7,
    marginLeft: 5,
    marginRight: 5,
  },
});
