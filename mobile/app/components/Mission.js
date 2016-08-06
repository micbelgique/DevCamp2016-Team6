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
  Platform
} from 'react-native';

import HttpService     from '../services/HttpService';
import DistanceService from '../services/DistanceService';
import styles          from '../styles/MissionStyles';

class Mission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spots:     [],
      latitude:  0,
      longitude: 0
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.reloadSpots();

      this.watchID = navigator.geolocation.watchPosition((position) => {
        console.log(position);

        this.setState({
          latitude:  position.coords.latitude,
          longitude: position.coords.longitude,
        })
      });
    });
  }

  spotsUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions/' + this.props.mission.id + '/spots';
  }

  reloadSpots() {
    url = this.spotsUrl()

    new HttpService(url).get({
      device_id: this.props.deviceId
    }, data => {
      console.log(data);
      this.setState({ spots: data });
    });
  }

  goToSpot(spot) {
    this.props.navigator.push({
      controller: 'spots',
      action:     'show',
      mission:    this.props.mission,
      spot:       spot
    });
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.imagesContainer}>
          { this.renderSpots() }
        </View>
      </ScrollView>
    );
  }

  renderSpots() {
    return this.state.spots.map((spot) => {
      if(Platform.OS === 'ios')
        return this.renderSpotForIOS(spot);
      else
        return this.renderSpotForAndroid(spot);
    })
  }

  renderSpotForAndroid(spot) {
    return (
      <TouchableNativeFeedback key={spot.id}
                               onPress={this.goToSpot.bind(this, spot)}
                               background={TouchableNativeFeedback.SelectableBackground()}>
        { this.renderSpotInside(spot) }
      </TouchableNativeFeedback>
    );
  }

  renderSpotForIOS(spot) {
    return (
      <TouchableOpacity key={spot.id}
                        onPress={this.goToSpot.bind(this, spot)}>
        { this.renderSpotInside(spot) }
      </TouchableOpacity>
    );
  }

  renderSpotInside(spot) {
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    console.log(spot.latitude);
    console.log(spot.longitude);

    if(spot.ownPicture) {
      picture = spot.ownPicture
    } else {
      picture = spot.picture
    }

    return (
      <View>
        <Image style={styles.image} source={{uri: picture}}>
          <Text style={styles.name}>
            { spot.name }
          </Text>
          <Text style={styles.name}>
            Distance : { (DistanceService.get(this.state.latitude, this.state.longitude, spot.latitude, spot.longitude)*1000.0).toFixed(0) }m
          </Text>
        </Image>
      </View>
    );
  }
}

module.exports = Mission;
