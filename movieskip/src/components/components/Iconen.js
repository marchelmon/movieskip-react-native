import React, { Component } from 'react';
import { Image } from 'react-native';

//ANIMATION SOM GÖR ATT IKONERNA VÄXER NÄR FILTRET ÖPPNAS

class Iconen extends Component {
  render() {
    return (
      <Image
        source={this.props.image}
        style={[styles.iconStyle, { opacity: this.props.opacity }]}
      />
    );
  }
}

const styles = {
  iconStyle: {
    width: 55,
    height: 55,
    margin: 8
  }
};

export default Iconen;
