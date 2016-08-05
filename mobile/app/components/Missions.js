import React, { Component } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View
} from 'react-native';

import HttpService from '../services/HttpService';
import styles      from '../styles/MissionsStyles';
import _           from 'lodash'

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
    url = this.missionsUrl()

    new HttpService(url).get({
      device_id: this.props.deviceId
    }, data => {
      console.log (data);
      this.setState({ missions: data });
    });
  }

  missionsUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions';
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        { this.renderMissions() }
      </ScrollView>
    );
  }

  renderMissions() {
    return this.state.missions.map((mission) => {
      return (
        <View key={mission.id}>
          <Image style={styles.image}
                 source={{uri: mission.picture}}>
          </Image>
          <Text style={styles.name}>
            { mission.name }
          </Text>
          <Text style={styles.tagline}>
            { mission.tagline }
          </Text>
        </View>
      )
    })
  }
}

module.exports = Missions;
