import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(`@ToFeet:${key}`, data);
  } catch (error) {
    // Error saving data
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(`@ToFeet:${key}`);
    return value;
  } catch (error) {
    // Error saving data
  }
  return null;
};

export const storeLogin = async (key, data) => {
  try {
    await SecureStore.setItemAsync(`tofeet-${key}`, JSON.stringify(data));
  } catch (error) {
    // Error saving data
  }
};

export const getLogin = async key => {
  try {
    const value = await SecureStore.getItemAsync(`tofeet-${key}`);
    const item = JSON.parse(value);
    return item;
  } catch (error) {
    // Error saving data
  }
  return null;
};
