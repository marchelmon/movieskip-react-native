import React, { Component } from 'react';
import {
  View, Platform,
  Animated, PanResponder,
  Dimensions, LayoutAnimation,
  UIManager
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 150;


class Deck extends Component {
  static defaultProps = {
      onSwipeRight: () => {},
      onSwipeLeft: () => {}
    }
    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gesture) => {
            position.setValue({ x: gesture.dx, y: gesture.dy });
          },
          onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
              this.forceSwipe('right');
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
              this.forceSwipe('left');
            } else {
              this.resetPosition();
            }
          }
        });

        this.panResponder = panResponder;
        this.position = position;
        this.state = { index: 0 };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.data !== this.props.data) {
        this.setState({ index: 0 });
      }
    }

    onSwipeComplete(direction) {
      const { onSwipeRight, onSwipeLeft, data } = this.props;
      const item = data[this.state.index];

      direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
      this.position.setValue({ x: 0, y: 0 });
      this.setState({ index: this.state.index + 1 });
    }

    getCardStyle() {
      const rotate = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
        outputRange: ['-100deg', '0deg', '100deg']
      });

      return {
        ...this.position.getLayout(),
        transform: [{ rotate }]
      };
    }

    forceSwipe(direction) {
      const x = direction === 'right' ? SCREEN_WIDTH + 200 : -SCREEN_WIDTH - 200;
      Animated.timing(this.position, {
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION
      }).start(() => this.onSwipeComplete(direction));
    }

    resetPosition() {
      Animated.spring(this.position, {
        toValue: { x: 0, y: 0 }
      }).start();
    }

    renderCards() {
      if (this.state.index >= this.props.data.length) {
        return this.props.renderNoMoreCards();
      }

      const deck = this.props.data.map((item, i) => {
        if (i < this.state.index) { return null; }
        if (i === this.state.index) {
          return (
            <Animated.View
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.panResponder.panHandlers}
              key={item.id}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: 10 * (i - this.state.index) }]}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      });
      return deck;
    }

    render() {
      return (
          <View>
            {this.renderCards()}
          </View>
      );
    }
  }

  const styles = {
    cardStyle: {
      position: 'absolute',
      width: SCREEN_WIDTH
    }
  };

export default Deck;
