import { RFPercentage } from 'react-native-responsive-fontsize';

const theme = {
  colors: {
    black: '#000000',
    lightBlack: '#4F4F4F',
    darkGrey: '#828282',
    white: '#FFFFFF',
    veryLightGrey: '#F5F5F5',
    lightGrey: '#E3E3E3',
    green: '#8EDE6C',
    grey: '#ACACAC',
    alertRed: '#FF5A5F',
    alertGreen: '#3ADDA2',
    alertOrange: '#FF7F47',
    lightGreen: '#EBFFF8',
    lightRed: '#FFF3F5',
    alertBlue: '#6cc2de',
  },
  fontSizes: {
    primaryHeader: RFPercentage(4.1) < 32 ? RFPercentage(4.1) : 32,
    },
};

export default theme;
