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
import Mission  from './Mission';
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
    if(route.controller == 'missions') {
      if(route.action == 'index') {
        return (
          <Missions deviceId={Uuid.generate()}
                    navigator={navigator}/>
        )
      }
      else if(route.action == 'show') {
        return (
          <Mission deviceId={Uuid.generate()}
                   navigator={navigator}
                   mission={route.mission} />
        )
      }
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
