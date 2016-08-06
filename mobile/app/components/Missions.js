import React, { Component } from 'react';
import {
  InteractionManager,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  Platform,
  AsyncStorage
} from 'react-native';

import Icon        from 'react-native-vector-icons/FontAwesome';
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
      mission:     mission,
      onPop:       this.reloadMissions.bind(this)
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
        <TouchableHighlight key={mission.id}
                            onPress={this.goToMission.bind(this, mission)}>
          { this.renderMissionInside(mission) }
        </TouchableHighlight>
      );
    })
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

          { this.renderStars(mission) }
        </Image>
      </View>
    );
  }

  renderStars(mission) {
    ratio = 0

    if(mission.spotsCount > 0) {
      ratio = parseFloat(mission.ownSpotsCount) / parseFloat(mission.spotsCount)
      ratio = ratio * 100.0 / 20.0
    }

    return (
      <View style={styles.stars}>
        { this.renderStar(ratio, 1.0) }
        { this.renderStar(ratio, 2.0) }
        { this.renderStar(ratio, 3.0) }
        { this.renderStar(ratio, 4.0) }
        { this.renderStar(ratio, 5.0) }
      </View>
    )
  }

  renderStar(ratio, index) {
    if(ratio >= index - 0.5 && ratio < index)
      iconName = 'star-half-o'
    else if(ratio >= index)
      iconName = 'star'
    else
      iconName = 'star-o'

    return <Icon name={iconName} style={styles.star} />;
  }
}

module.exports = Missions;
