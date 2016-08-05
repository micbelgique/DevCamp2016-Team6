import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Routes from './app/components/Routes';

class Cliche extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

AppRegistry.registerComponent('Cliche', () => Cliche);
