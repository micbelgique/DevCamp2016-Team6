import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyles               from './GlobalStyles';

function vw(percentageWidth) {
  return Dimensions.get('window').width * (percentageWidth / 100);
}

function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}

module.exports = StyleSheet.create({
  container: {

  }
});
