import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as actions from '../actions';
import { Header, AnimatedScreen, RoundButton, Expand } from '../components';
import theme from '../theme';
import { ANALYSE } from '../domain/analyse';

export const mapStateToProps = ({ user, loading, analyse }) => ({
  user,
  loading,
  analyse,
});

export class AnalyseScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { getAnalysisHistory, getSoleIp } = this.props;

    getAnalysisHistory();
    getSoleIp();
  }

  handlePressing(elem) {
    const { fetchSimulation, fetchSole, launchML, analyse } = this.props;
    // const date = Date.now();

    switch (elem.id) {
      case 0: {
        /* Simulation */
        // fetchSimulation(date + 5000);
        /* Sole */
        fetchSole(analyse.soleIp);
        break;
      }
      case 1: {
        launchML();
        break;
      }
      default:
        break;
    }
  }

  render() {
    const { navigation, loading, analyse } = this.props;

    return (
      <AnimatedScreen style={styles.container}>
        <Header title="Analyse" navigation={navigation} />
        <ScrollView style={styles.scrollview}>
          {ANALYSE.map((elem, i) => (
            <View key={i}>
              <View>
                <Text style={styles.aboutTitle}>{elem.title}</Text>
                <Text style={styles.aboutDescription}>{elem.description}</Text>
              </View>
              {elem.id !== 2 && (
                <View style={styles.buttonsContainer}>
                  <RoundButton
                    text={elem.buttonTitle}
                    style={styles.validateButton}
                    textStyle={styles.validateText}
                    onPress={() => this.handlePressing(elem)}
                    loading={
                      loading.fetchData ||
                      loading.sendData ||
                      loading.getSoleIp ||
                      loading.launchMl
                    }
                    disabled={
                      loading.fetchData ||
                      loading.sendData ||
                      loading.getSoleIp ||
                      loading.launchMl
                    }
                  />
                </View>
              )}
            </View>
          ))}
          <View>
            <Text style={styles.historyTitle}>Historique d'analyses</Text>
            <FlatList
              data={analyse.history}
              ListEmptyComponent={
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 30,
                  }}
                >
                  <Text style={styles.aboutDescription}>
                    Aucune analyse réalisée
                  </Text>
                </View>
              }
              renderItem={({ item }) => <Expand item={item} />}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </ScrollView>
      </AnimatedScreen>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(AnalyseScreen);

AnalyseScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  analyse: PropTypes.object.isRequired,
  fetchSimulation: PropTypes.func.isRequired,
  fetchSole: PropTypes.func.isRequired,
  launchML: PropTypes.func.isRequired,
  getAnalysisHistory: PropTypes.func.isRequired,
  getSoleIp: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  scrollview: {
    paddingHorizontal: 15,
  },
  aboutTitle: {
    fontSize: RFPercentage(3),
    fontFamily: 'circular-medium',
    marginTop: 20,
  },
  historyTitle: {
    fontSize: RFPercentage(3),
    fontFamily: 'circular-medium',
    marginTop: 10,
    marginBottom: 20,
  },
  aboutDescription: {
    fontSize: RFPercentage(2.5),
    fontFamily: 'circular-book',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'justify',
    color: theme.colors.darkGrey,
  },
  buttonsContainer: {
    alignItems: 'center',
    paddingTop: 10,
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
  analysisView: {
    flex: 1,
  },
});
