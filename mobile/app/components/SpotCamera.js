import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  Alert,
  BackAndroid
} from 'react-native';

import HttpService from '../services/HttpService';
import styles      from '../styles/SpotCameraStyles';
import Camera      from 'react-native-camera';
import humps       from 'humps';

class SpotCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spot:          this.props.spot,
      uploadPercent: -1
    };
  }

  pictureUploadUrl() {
    return 'http://cliche-backend.phonoid.net/api/missions/' + this.props.mission.id + '/spots/' + this.state.spot.id + '/user_spot_links'
  }

  takePicture() {
    this.refs.camera.capture()
      .then((picture) => {
        this.setState({ uploadPercent: 'chargement' }, () => {
          xhr = new XMLHttpRequest();

          xhr.onload = () => {
            console.log(xhr.status, xhr.responseText);
            if(this.props.navigator.getCurrentRoutes().length == 3) { // still in missions > mission > spotCamera
              this.props.onPop();
              this.props.navigator.pop();
            }
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

          params = humps.decamelizeKeys({
            deviceId: this.props.deviceId,
            userSpotLink: {
              picture: picture.data
            }
          })

          xhr.send(JSON.stringify(params));
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  removePicture() {
    spot = this.state.spot;
    spot.ownPicture = null;
    new HttpService(this.pictureUploadUrl()).post({
      deviceId: this.props.deviceId
    })
    this.setState({spot: spot});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageOrCamera}>
          { this.renderImageOrCamera() }
        </View>
        <View style={styles.example}>
          <Image style={styles.exampleImage} source={{uri: this.state.spot.picture}}>
          </Image>
        </View>
      </View>
    );
  }

  renderImageOrCamera() {
    if(this.state.spot.ownPicture) {
      return (
        <Image style={styles.exampleImage} source={{uri: this.state.spot.ownPicture}}>
          <View style={styles.removeImageButton}>
            <TouchableHighlight onPress={this.removePicture.bind(this)}>
              <Text style={styles.removeImageText}>
                Retirer
              </Text>
            </TouchableHighlight>
          </View>
        </Image>
      )
    }
    else {
      if(this.state.uploadPercent == -1)
        text = this.renderTakePictureButton()
      else
        text = this.renderProgressText()

      return (
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
      )
    }
  }

  renderTakePictureButton() {
    return (
      <TouchableHighlight onPress={this.takePicture.bind(this)}>
        <Text style={styles.capture}>
          Capturer
        </Text>
      </TouchableHighlight>
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
