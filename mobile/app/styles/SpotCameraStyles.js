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
  removeImageButton: {
    flex: 1,
    //width: 100,
    alignItems: 'flex-end',
  },
  removeImageText: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'red',
    padding: 8,
    paddingLeft: 8,
    paddingRight: 8,
    opacity: 0.8
  },
  imageOrCamera: {
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
    margin: 20,
    opacity: 0.7
  },
  capture: {
    color: 'white',
    fontWeight: '700',
    padding: 20,
    paddingTop: 14,
    paddingBottom: 14,
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
