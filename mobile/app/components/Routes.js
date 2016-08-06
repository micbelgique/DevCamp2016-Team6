import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from 'react-native';

import Missions    from './Missions';
import Mission     from './Mission';
import SpotCamera  from './SpotCamera';
import NavBar      from './NavBar';
import UuidService from '../services/UuidService';
import styles      from '../styles/NavBarStyles';

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceId: ''
    };
  }

  componentWillMount() {
    this.loginIfPreviousSession()
  }

  loginIfPreviousSession() {
    AsyncStorage.getItem("deviceId").then((value) => {
      if(value != '' && value != null) {
        this.setState({deviceId: value});
      }
      else {
        uuid = UuidService.generate();

        AsyncStorage.setItem('deviceId', uuid, () => {
          this.setState({ deviceId: uuid });
        });
      }
    }).done();
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
    if(this.state.deviceId != '') {
      if(route.controller == 'missions') {
        if(route.action == 'index') {
          return (
            <Missions deviceId={this.state.deviceId}
                      navigator={navigator}/>
          )
        }
        else if(route.action == 'show') {
          return (
            <Mission deviceId={this.state.deviceId}
                     navigator={navigator}
                     mission={route.mission} />
          )
        }
      }
      else if(route.controller == "spots") {
        if(route.action == 'show') {
          return (
            <SpotCamera deviceId={this.state.deviceId}
                        navigator={navigator}
                        mission={route.mission}
                        spot={route.spot} />
          )
        }
      }
    }
  }

  renderNavigationBar() {
    return (
      <Navigator.NavigationBar navigationStyles={Navigator.NavigationBar.StylesIOS}
                               style={ styles.navBar }
                               routeMapper={NavBar({})}/>
    )
  }
}

module.exports = Routes;
