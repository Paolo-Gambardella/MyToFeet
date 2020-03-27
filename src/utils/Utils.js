import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// eslint-disable-next-line import/prefer-default-export
export const getIllustrationWidth = () => {
  const tmpWidth = width / 1.5;

  return tmpWidth > 300 ? 300 : tmpWidth;
};
