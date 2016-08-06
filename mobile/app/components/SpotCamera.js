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

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            var percent = Math.round((event.loaded / event.total) * 100)
            console.log(percent);

            this.setState({
              uploadPercent: percent
            });
          }
        }
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
            {text}
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
            onPress={this.takePicture.bind(this)}>Capturer</Text>
    )
  }

  renderProgressText() {
    return (
      <Text style={styles.progress}>{this.state.uploadPercent} %</Text>
    )
  }
}

module.exports = SpotCamera;
