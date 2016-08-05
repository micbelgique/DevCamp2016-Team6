import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Missions from './Missions';
import NavBar   from './NavBar';
import Uuid     from '../services/Uuid';
import styles   from '../styles/NavBarStyles';

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#188c85" translucent={true}/>
        <Navigator ref="navigator"
                   style={styles.container}
                   initialRoute={{ controller: 'missions', action: 'index' }}
                   renderScene={this.renderScene.bind(this)}
                   navigationBar={this.renderNavigationBar()}/>
      </View>
    );
  }

  renderScene(route, navigator) {
    if(route.controller == 'missions' && route.action == 'index') {
      console.log(route)

      return (
        <Missions deviceId={Uuid.generate()}/>
      )
    }
  }

  renderNavigationBar() {
    return (
      <Navigator.NavigationBar navigationStyles={Navigator.NavigationBar.StylesIOS}
                               style={styles.navBar}
                               routeMapper={NavBar({})}/>
    )
  }
}

module.exports = Routes;
