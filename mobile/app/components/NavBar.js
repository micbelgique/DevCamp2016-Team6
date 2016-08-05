import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon   from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/NavBarStyles';

var NavBar = props => ({
  LeftButton (route, navigator, index, navState) {
    missionsShow = route.controller == 'missions' && route.action == 'show'
    spotsShow    = route.controller == 'spots'    && route.action == 'show'

    if(missionsShow || spotsShow) {
      leftIconName = Platform.OS == 'android' ? 'arrow-back' : 'keyboard-arrow-left';

      return (
        <TouchableOpacity onPress={navigator.pop}>
          <View style={styles.leftIconContainer}>
            <Icon name={leftIconName}
                  style={styles.leftIcon} />
          </View>
        </TouchableOpacity>
      )
    }
  },

  RightButton (route, navigator, index, navState) {
    return (
      <Text>

      </Text>
    );
  },

  Title (route, navigator, index, navState) {
    title = ''

    if(route.controller == 'missions') {
      if(route.action == 'index') {
        title = 'Cliché'
      }
      else if(route.action == 'show') {
        title = route.mission.name
      }
    }
    else if(route.controller == 'spots') {
      if(route.action == 'show') {
        title = route.spot.name
      }
    }

    // center
    if(Platform.OS == 'ios') {
      left = 0
    }
    // left without space
    else if(Platform.OS == 'android' && route.controller == 'missions' && route.action == 'index') {
      left = 28
    }
    // left with space
    else {
      left = 50
    }

    titleContainerStyles = StyleSheet.create({
      titleContainer: {
        left: left
      }
    })

    return (
      <View style={[ styles.titleContainer, titleContainerStyles.titleContainer ]}>
        <Text style={styles.title}>
          { title }
        </Text>
      </View>
    );
  },
});

module.exports = NavBar;
