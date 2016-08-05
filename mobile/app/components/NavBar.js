import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

//import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/NavBarStyles';

var NavBar = props => ({
  LeftButton (route, navigator, index, navState) {
    return (
      <Text>

      </Text>
    );
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
    }

    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          { title }
        </Text>
      </View>
    );
  },
});

module.exports = NavBar;
