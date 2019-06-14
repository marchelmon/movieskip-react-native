import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'react-native-elements';
//import { MaterialIcons } from '@expo/vector-icons';
//import { Font } from 'expo'

const SCREEN_WIDTH = Dimensions.get('window').width;

class WatchlistScreen extends Component {

  static navigationOptions = {
    tabBarLabel: ({ tintColor }) => <Icon name="stars" size={33} color={tintColor} />
  }
/*
  async componentWillMount() {
    await Font.loadAsync({
      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf')
    });
  }
*/
  render() {
    return (
        <ScrollView contentContainerStyle={{ flex: 1, width: SCREEN_WIDTH }}>
          <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Text>Watchlist Screen</Text>
              <Button onPress={() => this.props.navigation.navigate('Manage')} title='Go to manager' />
              <ActivityIndicator size='large' color='#000' />
          </View>
        </ScrollView>
    );
  }
}

export default WatchlistScreen;
