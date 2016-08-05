import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import styles from '../styles/MissionStyles';

class Mission extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          { this.props.mission.name }
        </Text>
      </View>
    );
  }
}

module.exports = Mission;
