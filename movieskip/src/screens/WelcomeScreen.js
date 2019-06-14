import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

//Each item in the array is a instruction page
const SLIDE_DATA = [
  { text: 'Welcome to Movieskip', color: '#03A9F4' },
  { text: 'Filter movies showing, then swipe away', color: '#009688' },
  { text: 'Exlude and add movies to your watchlist', color: '#03A9F4' }
];

class WelcomeScreen extends Component {

/*
  state = { token: null };

  async componentWillMount() {
    const token = await AsyncStorage.getItem('fb-token');
    if (token) {
      this.props.navigation.navigate('Map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth');
  }
*/
  render() {
    /*
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    */
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
