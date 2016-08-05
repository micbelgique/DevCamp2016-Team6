import React, { Component } from 'react';
import {
  InteractionManager,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  Platform,
  AsyncStorage
} from 'react-native';

import HttpService from '../services/HttpService';
import styles      from '../styles/MissionsStyles';

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

  missionsUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions';
  }

  reloadMissions() {
    url = this.missionsUrl()

    new HttpService(url).get({
      device_id: this.props.deviceId
    }, data => {
      console.log(data);
      this.setState({ missions: data });
    });
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
    return this.state.missions.map((project) => {
      if(Platform.OS === 'ios')
        return this.renderMissionForIOS(project);
      else
        return this.renderMissionForAndroid(project);
    })
  }

  renderMissionForAndroid(mission) {
    return (
      <TouchableNativeFeedback key={mission.id}
                               onPress={this.goToMission.bind(this, mission)}
                               background={TouchableNativeFeedback.SelectableBackground()}>
        { this.renderMissionInside(mission) }
      </TouchableNativeFeedback>
    );
  }

  renderMissionForIOS(mission) {
    return (
      <TouchableOpacity key={mission.id}
                        onPress={this.goToMission.bind(this, mission)}>
        { this.renderMissionInside(mission) }
      </TouchableOpacity>
    );
  }

  renderMissionInside(mission) {
    return (
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
    );
  }
}

module.exports = Missions;
