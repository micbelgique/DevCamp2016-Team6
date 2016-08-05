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
    marginTop: GlobalStyles.headerMargin
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
    height: 140,
    //flex: 1,
    //height: 300,
    //width: vw(50),
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
