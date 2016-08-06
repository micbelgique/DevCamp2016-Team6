import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyles               from './GlobalStyles';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: GlobalStyles.headerMargin,
    backgroundColor: 'white'
  },
  example: {
    flex: 0.5
  },
  exampleImage: {
    height: Dimensions.get('window').height / 2,
    width:  Dimensions.get('window').width
  },
  camera: {
    flex: 0.5
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //height: Dimensions.get('window').height / 2,
  },
  captureContainer: {
    borderRadius: 5,
    backgroundColor: 'red',
    padding: 20,
    paddingTop: 14,
    paddingBottom: 14,
    margin: 20,
    opacity: 0.7
  },
  capture: {
    color: 'white',
    fontWeight: '700',
  },
  progress: {
    flex: 0,
    backgroundColor: '#000',
    color: '#fff',
    padding: 20,
    margin: 40,
    opacity: 0.6
  }
})
