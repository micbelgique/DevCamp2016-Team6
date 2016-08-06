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

  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 20,
    paddingTop: 14,
    paddingBottom: 14,
    margin: 20,
    opacity: 0.5
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
