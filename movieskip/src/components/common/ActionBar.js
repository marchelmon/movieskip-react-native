import React from 'react';
import { View } from 'react-native';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/layout';
import ActionButton from './ActionButton';


export default ({ onUndo, onSwipeRight, onSwipeLeft, onAddToWatchlist, undoDisabled }) => {
  return (
    <View style={styles.buttonContainer}>
      <ActionButton
        name="refresh"
        size={35}
        color={undoDisabled ? '#0f82f5' : '#d3d3d3'}
        type="material"
        action={onUndo}
        disabled={undoDisabled}
      />
      <ActionButton
        name="close"
        size={50}
        color="#bc140b"
        type="material"
        action={onSwipeLeft}
      />
      <ActionButton
        name="play-arrow"
        size={50}
        color="#0f82f5"
        type="material"
        action={onSwipeRight}
      />
      <ActionButton
        name="star"
        size={35}
        color="#f4dc42"
        type="material"
        action={onAddToWatchlist}
      />
    </View>
  )


}

const styles = {
  buttonContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT - 155,
    height: 95,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
};
