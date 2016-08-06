import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyles               from './GlobalStyles';

function vw(percentageWidth) {
  return Dimensions.get('window').width * (percentageWidth / 100);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

module.exports = StyleSheet.create({
  scroll: {
    flex: 1,
    marginTop: GlobalStyles.headerMargin,
    backgroundColor: 'white'
  },
  imagesContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-end',
    //justifyContent: 'flex-start',
  },
  image: {
    width: vw(50),
    height: 250,
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 14
    //flex: 1,
    //height: 300,
    //width: vw(50),
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    backgroundColor: 'red',
    paddingLeft: 4,
    paddingRight: 4,
    opacity: 0.8
  },
  distance: {
    textAlign: 'center',
    color: '#eeeeee',
    fontWeight: '700',
    fontSize: 10,
    backgroundColor: '#888888',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  loading: {
    textAlign: 'center',
    marginTop: 60
  }
});
