import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import * as actions from '../actions';
import theme from '../theme';
import { MENU } from '../domain/constants';
import { Header, AnimatedScreen } from '../components';

export const mapStateToProps = ({ user, loading }) => ({
  user,
  loading,
});

const { width } = Dimensions.get('window');

export class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  redirect(item) {
    const { navigation } = this.props;
    const { logout } = this.props;

    if (item.name === 'Déconnexion') {
      Alert.alert(
        'Déconnexion',
        'Êtes-vous sur de vouloir vous déconnecter ? ',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          { text: 'Oui', onPress: () => logout() },
        ]
      );
    } else navigation.navigate(item.route);
  }

  render() {
    const { navigation, user } = this.props;
    return (
      <AnimatedScreen style={styles.container}>
        <Header
          title="Menu"
          showAccount={false}
          showModalCalendar={this.handleShowCalendar}
          navigation={navigation}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            backgroundColor: theme.colors.white,
            paddingBottom: 20,
          }}
        >
          <View style={styles.enterpriseContainer}>
            <Text
              style={{
                fontSize: 26,
                color: theme.colors.green,
                fontFamily: 'circular-medium',
              }}
            >{`${user.infos.firstname} ${user.infos.lastname}`}</Text>
          </View>
          {MENU.map((section, i) => (
            <View style={styles.sectionContainer} key={i}>
              <Text style={styles.sectionTitle}>
                {section.section.toUpperCase()}
              </Text>
              {section.items.map((elem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.redirect(elem)}
                  style={[
                    styles.itemContainer,
                    {
                      borderBottomWidth:
                        index === section.items.length - 1 ? 0 : 1,
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        height: 36,
                        width: 36,
                        borderRadius: 18,
                        backgroundColor: elem.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialIcons
                        name={elem.icon}
                        size={20}
                        color={theme.colors.white}
                      />
                    </View>
                    <Text style={styles.itemName}>{elem.name}</Text>
                  </View>
                  <EvilIcons
                    name="chevron-right"
                    size={28}
                    color={theme.colors.grey}
                    style={{ left: 10 }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </AnimatedScreen>
    );
  }
}

export default connect(
  mapStateToProps,
  actions
)(MenuScreen);

MenuScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  sectionContainer: {
    width,
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'circular-medium',
    color: '#96ABB1',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingBottom: 7,
  },
  itemContainer: {
    width,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.veryLightGrey,
    borderBottomWidth: 1,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontFamily: 'circular-book',
    color: theme.colors.grey,
    fontSize: 15,
    marginLeft: 20,
  },
  enterpriseContainer: {
    paddingTop: 5,
    paddingBottom: 15,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
