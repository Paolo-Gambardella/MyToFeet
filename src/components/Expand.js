import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import PropTypes from 'prop-types';
import { EvilIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import theme from '../theme';
import { MONTHS } from '../domain/constants';

export class Expand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.toggle = this.toggle.bind(this);
    this.getAnalyseTime = this.getAnalyseTime.bind(this);
    this.getAnalysePeriodTime = this.getAnalysePeriodTime.bind(this);
  }

  toggle() {
    const { expanded } = this.state;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !expanded });
  }

  getResultColor(result) {
    switch (result) {
      case 0:
        return theme.colors.alertGreen;
      case 1:
        return theme.colors.alertRed;
      default:
        return theme.colors.alertBlue;
    }
  }

  getFormattedDate(date) {
    let tmpDate = date.substring(0, date.indexOf('T'));
    tmpDate = tmpDate.split('-');
    return `${tmpDate[2]} ${MONTHS[tmpDate[1] - 1]} ${tmpDate[0]}`;
  }

  getAnalyseTime(time) {
    let tmpTime = time.substring(time.indexOf('T') + 1, time.indexOf('.'));
    tmpTime = tmpTime.split(':');
    return `${tmpTime[0]}h${tmpTime[1]}`;
  }

  getAnalysePeriodTime(time) {
    const date = new Date(time);
    return this.getAnalyseTime(date.toISOString());
  }

  handleResult(result) {
    switch (result) {
      case 0:
        return 'AUNCUNE ANOMALIE';
      case 1:
        return 'ANOMALIE DÉTECTÉE';
      default:
        return 'CRÉATION DU PROFILE DE MARCHE';
    }
  }

  render() {
    const { item } = this.props;
    const { expanded } = this.state;

    return (
      <View style={styles.analysisView}>
        <View>
          <TouchableOpacity onPress={this.toggle} style={styles.analysisHeader}>
            <View style={{ paddingHorizontal: 15 }}>
              <View
                style={[
                  styles.result,
                  { backgroundColor: this.getResultColor(item.result) },
                ]}
              />
            </View>
            <Text style={styles.date}>
              {this.getFormattedDate(item.createdAt)}
            </Text>
            <EvilIcons
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={40}
              color={theme.colors.grey}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: expanded ? null : 0,
            overflow: 'hidden',
          }}
        >
          {item.result !== 2 && (
            <Text style={styles.bodyText}>
              {`Analyse réalisée à ${this.getAnalyseTime(
                item.createdAt
              )} grace aux données récupérées du ${this.getFormattedDate(
                new Date(item.timestampMin).toISOString()
              )} ${this.getAnalysePeriodTime(
                item.timestampMin
              )} au ${this.getFormattedDate(
                new Date(item.timestampMax).toISOString()
              )} ${this.getAnalysePeriodTime(item.timestampMax)}.`}
            </Text>
          )}
          <Text
            style={[
              styles.bodyText,
              {
                color: theme.colors.black,
                fontFamily: 'circular-bold',
              },
            ]}
          >
            {this.handleResult(item.result)}
          </Text>
          {item.result !== 2 && (
            <Text style={styles.bodyText}>
              {`Résultat avec une confiance de ${item.confidence}%`}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

export default Expand;

Expand.defaultProps = {};

Expand.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  analysisView: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.veryLightGrey,
    marginBottom: 10,
  },
  analysisHeader: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: RFPercentage(3.5),
    fontFamily: 'circular-book',
    color: theme.colors.black,
  },
  result: {
    height: 15,
    width: 15,
    borderRadius: 8,
  },
  bodyText: {
    fontSize: RFPercentage(2.5),
    fontFamily: 'circular-book',
    marginBottom: 10,
    color: theme.colors.darkGrey,
    textAlign: 'center',
  },
});
