import { StyleSheet } from 'react-native';
import GlobalStyles   from './GlobalStyles'

module.exports = StyleSheet.create({
  scroll: {
    marginTop: GlobalStyles.headerMargin
  },
  image: {
    flex: 1,
    height: 300
  },
  name: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    textAlign: 'center',
    marginTop: -100,
  },
  tagline: {
    textAlign: 'center',
  }
});
