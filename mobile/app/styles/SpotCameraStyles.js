import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyles               from './GlobalStyles';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerMargin
  },
  example: {
    flex: 0.5
  },
  exampleImage: {
    height: 400
  },
  camera: {
    flex: 0.5
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width:  Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
