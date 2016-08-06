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

    this.state = {
      uploadPercent: -1
    };
  }

  pictureUploadUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions/' + this.props.mission.id + '/spots/' + this.props.spot.id + '/user_spot_links'
  }

  takePicture() {
    this.refs.camera.capture()
      .then((picture) => {
        this.setState({ uploadPercent: 'chargement' }, () => {
          xhr = new XMLHttpRequest();

          xhr.onload = () => {
            console.log(xhr.status, xhr.responseText);
            this.props.onPop();
            this.props.navigator.pop();
          }

          xhr.onerror = function() {}

          // don't work on android
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              var percent = Math.round((event.loaded / event.total) * 100)
              this.setState({
                uploadPercent: percent
              });
            }
          }

          xhr.open('POST', this.pictureUploadUrl(), true);
          xhr.setRequestHeader("Content-type", 'application/json');

          params = {
            device_id: this.props.deviceId,
            user_spot_link: {
              picture: picture.data
            }
          }

          xhr.send(JSON.stringify(params));
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    if(this.state.uploadPercent == -1)
      text = this.renderTakePictureButton()
    else
      text = this.renderProgressText()

    return (
      <View style={styles.container}>
        <View style={styles.camera}>
          <Camera ref="camera"
                  style={styles.preview}
                  aspect={Camera.constants.Aspect.fill}
                  captureAudio={false}
                  orientation={Camera.constants.Orientation.portrait}
                  captureTarget={Camera.constants.CaptureTarget.memory}
                  captureQuality={Camera.constants.CaptureQuality.low}>
            <View style={styles.captureContainer}>
              {text}
            </View>
          </Camera>
        </View>
        <View style={styles.example}>
          <Image style={styles.exampleImage} source={{uri: this.props.spot.picture}}>
          </Image>
        </View>
      </View>
    );
  }

  renderTakePictureButton() {
    return (
      <Text style={styles.capture}
            onPress={this.takePicture.bind(this)}>
        Capturer
      </Text>
    )
  }

  renderProgressText() {
    return (
      <Text style={styles.capture}>
        {this.state.uploadPercent}
      </Text>
    )
  }
}

module.exports = SpotCamera;
