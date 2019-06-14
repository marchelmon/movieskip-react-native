import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Map');
    }
  }
  render() {
    return (
      <View style={styles.textStyle}>
        <Button
          title='Gå hem!'
          onPress={() => { this.props.navigation.pop(); }}
        />
      </View>
    );
  }
}

const styles = {
  textStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
