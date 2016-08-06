import { StyleSheet, Platform } from 'react-native';
import _                        from'lodash';
import GlobalStyles             from './GlobalStyles'

if(Platform.OS == 'android') {
  titleContainerPlatform = {
    position: 'absolute',
    alignItems: 'flex-start',
  }
}
else
  titleContainerPlatform = {}

module.exports = StyleSheet.create({
  navBar: {
    height: GlobalStyles.headerMargin,
    backgroundColor: '#20B7AF',
    flex: 1
  },
  titleContainer: _.merge({
    flex: 1,
    paddingBottom: 15,
  }, titleContainerPlatform),
  title: {
    textAlign: 'left',
    color: 'white',
    marginTop: 19,
    fontSize: 18,
    fontWeight: '500',
  },
  leftIconContainer: {
    marginLeft: Platform.OS == 'android' ? 8 : 2,
    paddingTop: 19,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 15.5
  },
  leftIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: '300'
  }
});
