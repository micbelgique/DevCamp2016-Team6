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
      this.bindGeoLocation();
      this.bindBackButton();
    });
  }

  componentWillUnmount() {
    this.unbindBackButton();
    this.unbindGeolocation();
  }

  bindBackButton() {
    this.back = this.back.bind(this)
    BackAndroid.addEventListener('hardwareBackPress',  this.back);
  }

  unbindBackButton() {
    BackAndroid.removeEventListener('hardwareBackPress', this.back);
  }

  bindGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({position}),
      (error)    => console.log(error),
    //  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.setState({position});
    });
  }

  unbindGeolocation () {
    navigator.geolocation.clearWatch(this.watchId);
  }

  back() {
    this.props.onPop();
    this.props.navigator.pop();
    return true;
  }

  spotsUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions/' + this.props.mission.id + '/spots';
  }

  reloadSpots() {
    url = this.spotsUrl()

    new HttpService(url).get({
      deviceId: this.props.deviceId
    }, data => {
      console.log(data);
      this.setState({ spots: data });
    });
  }

  // removeOwnPicture(spot_id) {
  //   this.spots.forEach((spot) => {
  //     if(spot.id == spot_id)
  //       spot.ownPicture = null
  //   })
  // }

  goToSpot(spot) {
    this.props.navigator.push({
      controller:       'spots',
      action:           'show',
      mission:          this.props.mission,
      spot:             spot,
      onPop:            this.reloadSpots.bind(this)
    });
  }

  distance(spot) {
    if(this.state.position) {
      distance = DistanceService.get(this.state.position.coords.latitude,
                                     this.state.position.coords.longitude,
                                     spot.latitude,
                                     spot.longitude)

      if(distance < 1.0) {
        distance = distance * 1000
        unit     = 'm'
      }
      else if(distance < 10.0) {
        distance = distance.toFixed(2)
        unit     = 'km'
      }
      else {
        distance = distance.toFixed(0)
        unit     = 'km'
      }

      return "Distance : " + distance + unit;
    }
    else
      return '';
  }

  render() {
    if(this.state.spots.length)
      return this.renderScrollView();
    else
      return this.renderLoading();
  }

  renderLoading() {
    return (
      <ScrollView style={styles.scroll}>
        <Text style={styles.loading}>
          Chargement...
        </Text>
      </ScrollView>
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
      return (
        <TouchableHighlight key={spot.id}
                            onPress={this.goToSpot.bind(this, spot)}>
          { this.renderSpotInside(spot) }
        </TouchableHighlight>
      );
    })
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
    if(this.state.position && spot.geolocalized) {
      return (
        <Text style={styles.distance}>
          { this.distance(spot) }
        </Text>
      );
    }
  }
}

module.exports = Mission;
