import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

var Routes = require('./app/components/Routes');

class Cliche extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

AppRegistry.registerComponent('Cliche', () => Cliche);
