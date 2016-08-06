import React, { Component } from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  Alert,
  TouchableWithoutFeedback
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
      .then((picture) => {
        url = 'http://cliche-backend.phonoid.net/api/missions/' + this.props.mission.id + '/spots/' + this.props.spot.id + '/user_spot_links'

        new HttpService(url).post({
          device_id: this.props.deviceId,
          user_spot_link: {
            picture: picture.data
          }}, (data) => {
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
        <View style={styles.camera}>
          <TouchableWithoutFeedback onPress={this.takePicture.bind(this)}>
            <Camera ref="camera"
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    orientation={Camera.constants.Orientation.auto}
                    captureTarget={Camera.constants.CaptureTarget.memory}>
              <Text style={styles.capture}
                    onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
            </Camera>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.example}>
          <Image style={styles.exampleImage} source={{uri: this.props.spot.picture}}>
          </Image>
        </View>
      </View>
    );
  }
}

module.exports = SpotCamera;
