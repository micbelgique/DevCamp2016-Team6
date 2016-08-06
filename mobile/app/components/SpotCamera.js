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
  TouchableWithoutFeedback,
  BackAndroid
} from 'react-native';

import HttpService from '../services/HttpService';
import styles      from '../styles/SpotCameraStyles';
import Camera      from 'react-native-camera';

class SpotCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.back = this.back.bind(this)
    this.bindBackButton();
  }

  componentWillUnmount() {
    this.unbindBackButton();
  }

  bindBackButton() {
    BackAndroid.addEventListener('hardwareBackPress', this.back);
  }

  unbindBackButton() {
    BackAndroid.removeEventListener('hardwareBackPress', this.back);
  }

  back() {
    this.props.navigator.pop();
    return true;
  }

  pictureUploadUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions/' + this.props.mission.id + '/spots/' + this.props.spot.id + '/user_spot_links'
  }

  takePicture() {
    this.refs.camera.capture()
      .then((picture) => {
        xhr = new XMLHttpRequest();
        xhr.open('POST', this.pictureUploadUrl(), true);
        xhr.setRequestHeader("Content-type", 'application/json');

        params = {
          device_id: this.props.deviceId,
          user_spot_link: {
            picture: picture.data
          }
        }

        xhr.send(JSON.stringify(params));

        xhr.onload = () => {
          console.log(xhr.status, xhr.responseText);
          this.props.onPop();
          this.props.navigator.pop();
        }

        xhr.onerror = function() {}

        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            var percent = Math.round((event.loaded / event.total) * 100)
            console.log(percent);
          }
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.camera}>
          <Camera ref="camera"
                  style={styles.preview}
                  aspect={Camera.constants.Aspect.fill}
                  orientation={Camera.constants.Orientation.auto}
                  captureTarget={Camera.constants.CaptureTarget.memory}>
            <Text style={styles.capture}
                  onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </Camera>
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
