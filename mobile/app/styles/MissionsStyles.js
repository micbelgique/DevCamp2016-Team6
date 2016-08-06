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
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    backgroundColor: 'red',
    paddingLeft: 6,
    paddingRight: 6,
    opacity: 0.8
  },
  tagline: {
    textAlign: 'center',
    color: '#eeeeee',
    fontWeight: '700',
    fontSize: 14,
    backgroundColor: '#888888',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  stars: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  star: {
    fontSize: 22,
    padding: 0,
    color: 'whitesmoke',
    opacity: 0.9
  }
});
