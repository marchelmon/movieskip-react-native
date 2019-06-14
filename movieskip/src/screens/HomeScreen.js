import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LOGO } from '../../assets/global_vars';

import Swipe from '../components/Swipe';
import SwipeCard from '../components/common/SwipeCard';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params !== undefined) {
      return {
          tabBarLabel: ({ focused, tintColor }) => {
            if (focused) {
              return (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={LOGO}
                    style={styles.iconStyle}
                  />
                  <Text style={{ color: tintColor, fontSize: 10 }}>Filter</Text>
                </View>
              );
            }
            return (
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={require('../../assets/mvskpIcon.png')}
                  style={[styles.iconStyle, { opacity: 0.5 }]}
                />
                <Text style={{ color: tintColor, fontSize: 10 }}>Filter</Text>
              </View>
            );
          }
      };
    }
  }

  componentWillMount() {
    this.props.handleContent(this.props.filter);
  }

  // behövs yearFrom yearTo nedan???
  componentDidMount() {
    this.props.navigation.setParams();
  }

  renderCard({ text, poster, id, type, rating, releaseYear }) {
    return (
      <SwipeCard
        title={text}
        image={{ uri: poster }}
        key={id + type}
        rating={rating}
        year={releaseYear}
      />
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="All done!" style={{ top: 40, bottom: 20 }}>
        <Text style={{ marginBottom: 10 }}>
          There is no more content here
        </Text>
        <Button
          title="Get more"
        />
      </Card>
    );
  }

  render() {
    return (
      <Swipe
        data={this.props.content}
        renderCard={this.renderCard}
        renderNoMoreCards={this.renderNoMoreCards}
      />
    );
  }
}

const styles = {
  loading: {
    position: 'absolute',
    zIndex: 10000,
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: '#fff'
  },
  iconStyle: {
    width: 27,
    height: 27,
    marginRight: 1,
    marginLeft: 1,
    padding: 10
  }
};

const mapStateToProps = (state) => {
  return {
    content: state.filter.content,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, actions)(HomeScreen);
