import React, { Component } from 'react';
import {
  InteractionManager,
  TouchableNativeFeedback,
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

  goToMission(mission) {
    this.props.navigator.push({
      controller: 'missions',
      action:     'show',
      mission:     mission
    });
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
        <TouchableNativeFeedback key={mission.id}
                                 onPress={this.goToMission.bind(this, mission)}
                                 background={TouchableNativeFeedback.SelectableBackground()}>
          <View>
            <Image style={styles.image} source={{uri: mission.picture}}>
              <Text style={styles.name}>
                { mission.name }
              </Text>
              <Text style={styles.tagline}>
                { mission.tagline }
              </Text>
            </Image>
          </View>
        </TouchableNativeFeedback>
      )
    })
  }
}

module.exports = Missions;
