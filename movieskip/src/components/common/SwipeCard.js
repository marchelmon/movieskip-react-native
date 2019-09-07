import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/layout';

class SwipeCard extends Component {

  render() {
    const height = SCREEN_HEIGHT - 150;
    const width = height / 1.5;
    const left = (SCREEN_WIDTH - width) / 2;
    return (
      <View style={{ flex: 1 }} >
        <View style={{ flex: 1 }}>
          <View style={{ width, height, left, paddingTop: 10 }}>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 4,
                }}
                source={this.props.image}
              />
              <View style={styles.ratingBox}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{this.props.rating}</Text>
                <Icon name='star' size={25} color='yellow' style={{ opacity: 1, zIndex: 1000 }} />
              </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  imageStyle: {
    flex: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  containerStyle: {
    width: SCREEN_WIDTH - 10,
    height: SCREEN_HEIGHT - (SCREEN_HEIGHT / 4),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingBox: {
    height: 40,
    width: 80,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    borderRadius: 4
  }
};

export default SwipeCard;
