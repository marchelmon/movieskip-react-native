import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button } from 'react-native-elements';

import * as actions from '../../actions';
//import Swipe from '../components/Swipe';

class DeckScreen extends Component {


  renderCard(job) {
    const region = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    return (
      <Card title={job.jobTitle} key={job.id}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={region}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.time}</Text>
        </View>
        <Text>
          {job.snippet}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          title='Back to map'
          large
          icon={{ name: 'my-location' }}
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </Card>
    );
  }

}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};

const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results };
};

export default connect(mapStateToProps, actions)(DeckScreen);
