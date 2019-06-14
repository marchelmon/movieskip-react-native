import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
} from 'react-native';
import { connect } from 'react-redux';
import { SCREEN_WIDTH } from '../../assets/global_vars';
import * as actions from '../../actions';

import ActionBar from './common/ActionBar';


const SWIPE_THRESHOLD = 0.3 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 200;

class Swipe extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
        if (!this.state.move) {
          this.setState({ move: true });
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (this.state.move) {
          if (gesture.dx > SWIPE_THRESHOLD) {
            this.doAction('skip');
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            this.doAction('exclude');
          } else {
            this.resetPosition();
          }
        } else {
          console.log('Kör modal med filmdata här');
        }
        this.setState({ move: false });
        //Lägg till för att swipea uppåt
        //Kör 'star' högst upp i if, så att det i första hand blir att filmen hamnnar i watchlist
        //Om det skulle vara att den både är utom SWIP_TRESHOLD på bredden och på höjden
      }
    });

    this.state = { panResponder, position, undoDisabled: true };
  }

  onSwipeComplete(direction) {
    const { position } = this.state;
    const { content, excluded, updateContent, setExcluded, addToWatchlist, handleContent, filter } = this.props;
    const last = content.shift();
    if (last !== this.state.last) updateContent(content);
    if (direction === 'exclude') {
      const newExcluded = [...excluded, last.id];
      setExcluded(newExcluded);
    } else if (direction === 'star') {
      addToWatchlist(last.id);
    }
    handleContent(filter);
    console.log('Content: ' + content.length + ' Pages: ' + filter.pages.length + ' preContent: ' + filter.preContent.length + ' Excluded: ' + excluded);
    position.setValue({ x: 0, y: 0 });
    this.setState({ last, undoDisabled: false });
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });

    this.likeOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });

    this.nopeOpacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    this.nextCardSize = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.9, 1],
      extrapolate: 'clamp'
    });

    this.nextCardSizeY = position.y.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  doAction(direction, button = false) {
    this.setState({ undoDisabled: true });
    if (direction === 'undo' && !this.state.undoDisabled) {
      this.props.content.unshift(this.state.last);
      this.props.removeFromWatchlist(this.state.last.id);
      this.props.removeFromExcluded(this.state.last.id);
      return;
    }
    //LÄGG TILL FÖR 'star' OM y ÄR UTANFÖR TRESHOLD uppåt
    const x = direction === 'skip' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: button ? 1000 : SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  renderCards() {
    if (this.props.content.length === 0) {
      return this.props.renderNoMoreCards();
    }
    const deck = this.props.content.map((item, i) => {
      if (i === 0) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle, { zIndex: 1000 }]}
            {...this.state.panResponder.panHandlers}
          >
            <Animated.View style={[styles.likeView, { opacity: this.likeOpacity }]}>
              <Text style={styles.likeStyle}>Skip</Text>
            </Animated.View>
            <Animated.View style={[styles.nopeView, { opacity: this.nopeOpacity }]}>
              <Text style={styles.nopeStyle}>Exclude</Text>
            </Animated.View>
              {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item.id}
          style={
            [
              styles.cardStyle,
              { zIndex: -1,
                transform: [{ scale: this.nextCardSize }]
              }
            ]
          }
        >
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });
    return deck.reverse();
  }

  render() {
    return (
      <View style={styles.cardStyle}>
        {this.renderCards()}

        <ActionBar
          onUndo={this.doAction.bind(this, 'undo', true)}
          onSwipeRight={this.doAction.bind(this, 'skip', true)}
          onSwipeLeft={this.doAction.bind(this, 'exclude', true)}
          onAddToWatchlist={this.doAction.bind(this, 'star', true)}
          undoDisabled={!this.state.undoDisabled}
        />
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    flexDirection: 'column',
    flex: 1
  },
  buttonStyle: {
    position: 'absolute',
    flexDirection: 'column',
    flex: 1,
  },
  likeView: {
    transform: [{ rotate: '-30deg' }],
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 1000
  },
  likeStyle: {
    borderWidth: 5,
    borderColor: '#0f82f5',
    borderRadius: 10,
    color: '#0f82f5',
    fontSize: 24,
    fontWeight: '800',
    padding: 8
  },
  nopeView: {
    transform: [{ rotate: '30deg' }],
    position: 'absolute',
    top: 50,
    right: 0,
    zIndex: 1000
  },
  nopeStyle: {
    borderWidth: 4,
    borderColor: '#bc140b',
    borderRadius: 10,
    color: '#bc140b',
    fontSize: 24,
    fontWeight: '800',
    padding: 6
  }
};
const mapStateToProps = state => {
  return {
    filter: state.filter,
    content: state.filter.content,
    excluded: state.list.excluded
  };
};

export default connect(mapStateToProps, actions)(Swipe);
