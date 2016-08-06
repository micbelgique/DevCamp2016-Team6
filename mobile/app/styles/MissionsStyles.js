import { StyleSheet } from 'react-native';
import GlobalStyles   from './GlobalStyles';

module.exports = StyleSheet.create({
  scroll: {
    marginTop: GlobalStyles.headerMargin
  },
  image: {
    flex: 1,
    height: 304,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    color: '#ffffff'
  },
  tagline: {
    textAlign: 'center',
    color: '#ffffff'
  }
});
