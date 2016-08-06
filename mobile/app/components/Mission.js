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
  BackAndroid
} from 'react-native';

import HttpService     from '../services/HttpService';
import DistanceService from '../services/DistanceService';
import styles          from '../styles/MissionStyles';

class Mission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spots:     [],
      position:  null,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.reloadSpots();

      navigator.geolocation.getCurrentPosition(
        (position) => this.setState({position}),
        (error)    => console.log(error),
      //  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      navigator.geolocation.watchPosition((position) => {
        this.setState({position});
      });

      this.back = this.back.bind(this)
      this.bindBackButton();
    });
  }

  componentWillUnmount() {
    this.unbindBackButton();
  }

  bindBackButton() {
    BackAndroid.addEventListener('hardwareBackPress',  this.back);
  }

  unbindBackButton() {
    BackAndroid.removeEventListener('hardwareBackPress', this.back);
  }

  back() {
    this.props.navigator.pop();
    return true;
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
      spot:       spot,
      onPop:      this.reloadSpots.bind(this)
    });
  }

  render() {
    if(this.state.spots.length)
      return this.renderScrollView();
    else
      return this.renderLoading();
  }

  renderLoading() {
    return (
      <Text>Chargement...</Text>
    );
  }

  renderScrollView() {
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

  distance(spot) {
    if(this.state.position)
      return "Distance : " + (DistanceService.get(this.state.position.coords.latitude,
                                                  this.state.position.coords.longitude,
                                                  spot.latitude,
                                                  spot.longitude)*1000.0).toFixed(0) + "m";
    else
      return ''
  }

  renderSpotInside(spot) {
    picture = spot.ownPicture ? spot.ownPicture : spot.picture

    return (
      <View>
        <Image style={styles.image} source={{uri: picture}}>
          <Text style={styles.name}>
            { spot.name }
          </Text>
          { this.renderDistance(spot) }
        </Image>
      </View>
    );
  }

  renderDistance(spot) {
    if(this.state.position) {
      return (
        <Text style={styles.distance}>
          { this.distance(spot) }
        </Text>
      );
    }
  }
}

module.exports = Mission;
