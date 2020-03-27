import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as actions from '../actions';
import { CreateHeader } from '../components';
import theme from '../theme';
import 'moment/locale/fr';
import { ABOUT } from '../domain/about';

moment.locale('fr');

const mapStateToProps = ({ user, loading }) => ({
  user,
  loading,
});

// eslint-disable-next-line react/prefer-stateless-function
export class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CreateHeader title="À propos" />
        <ScrollView style={styles.scrollview}>
          {ABOUT.map((elem, i) => (
            <View key={i}>
              <Text style={styles.aboutTitle}>{elem.title}</Text>
              <Text style={styles.aboutDescription}>{elem.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(AboutScreen);

AboutScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollview: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  aboutTitle: {
    fontSize: RFPercentage(3),
    fontFamily: 'circular-medium',
    marginTop: 20,
  },
  aboutDescription: {
    fontSize: RFPercentage(2.5),
    fontFamily: 'circular-book',
    marginTop: 15,
    textAlign: 'justify',
    color: theme.colors.darkGrey,
  },
});
