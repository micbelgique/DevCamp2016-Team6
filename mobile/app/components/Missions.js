import React, { Component } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  View
} from 'react-native';

import styles from '../styles/MissionsStyles';

class Missions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      missions: [],
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.reloadMissions();
    });
  }

  reloadMissions() {

  }

  missionsUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions';
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          { this.missionsUrl() + this.props.deviceId }
        </Text>
      </View>
    );
  }
}

module.exports = Missions;
