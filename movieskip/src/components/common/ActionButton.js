import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';


class ActionButton extends Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.action} style={styles.iconContainer}>
          <Icon
            name={this.props.name}
            size={this.props.size}
            color={this.props.color}
            type={this.props.type}
            disabled={this.props.disabled}
          />
        </TouchableOpacity>
    );
  }
}

const styles = {
  iconContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: '#d3d3d3',
    shadowOpacity: 1.0,
    backgroundColor: '#fff',
    padding: 8
  }
};

export default ActionButton;
