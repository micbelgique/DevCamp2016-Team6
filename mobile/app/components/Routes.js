import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Missions   from './Missions';

class Routes extends Component {
  render() {
    return (
      <Missions deviceId={DeviceInfo.getUniqueID()}/>
    );
  }
}

module.exports = Routes;
