import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  Alert
} from 'react-native';

import HttpService from '../services/HttpService';
import styles      from '../styles/SpotCameraStyles';
import Camera      from 'react-native-camera';

class SpotCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

  }

  takePicture() {
    this.refs.camera.capture()
      .then((data) => {
        Alert.alert(data.path);

        var photo = {
          uri:   data.path,
          type: 'image/jpeg',
          name: 'photo.jpg',
        };

        url = 'http://cliche-backend.phonoid.net/api/missions/' + this.props.mission.id + '/spots/' + this.props.spot.id + '/user_spot_links'

        new HttpService(url).post({ user_spot_link: { picture: photo }}, (data) => {
          console.log(data);
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera ref="camera"
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                orientation={Camera.constants.Orientation.auto}>
          <Text style={styles.capture}
                onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

module.exports = SpotCamera;
