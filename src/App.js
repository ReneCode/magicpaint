/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, PanResponder } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "click & move"
    }

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      // onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: this.handleGrant,
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!

      // gestureState.d{x,y} will be set to zero now

      onPanResponderMove: this.handleMove,
      // The most recent move distance is gestureState.move{X,Y}

      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}

      // onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: this.handleEnd,
      //   // The user has released all touches while this view is the
      //   // responder. This typically means a gesture has succeeded
      // },
      onPanResponderTerminate: this.handleEnd,
      //   // Another component has become the responder, so this gesture
      //   // should be cancelled
      // },
      // onShouldBlockNativeResponder: (evt, gestureState) => {
      //   // Returns whether this component should block native components from becoming the JS
      //   // responder. Returns true by default. Is currently only supported on android.
      //   return true;
      // },
    });
  }

  handleGrant = (evt, gestureState) => {
    console.log("start")

    this.setState({
      text: `start`,
      dx: gestureState.dx,
      dy: gestureState.dy
    })
    this.refs.box.setNativeProps({
      backgroundColor: "lightgreen"
    })
  }

  handleMove = (evt, gestureState) => {
    const text = `dx: ${Math.floor(gestureState.dx)} dy:${Math.floor(gestureState.dy)}`

    this.setState({
      text,
      dx: gestureState.dx,
      dy: gestureState.dy
    })
  }

  handleEnd = (evt, gestureState) => {
    this.setState({
      text: "ready"
    })
    this.refs.box.setNativeProps({
      backgroundColor: "lightblue"
    })
  }

  render() {
    return (
      <View
        ref="box"
        style={styles.container}
        {...this.panResponder.panHandlers}
      >
        <Text style={styles.text}>{this.state.text}</Text>
        <Svg

          height="100%"
          width="100%"
        >
          <Rect
            x={this.state.dx}
            y={this.state.dy}
            width="70"
            height="70"
            stroke="red"
            strokeWidth="2"
            fill="yellow"
          />
        </Svg>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c5"
  },
  svg: {
    flex: 1
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: "red",
    position: "absolute",
    opacity: 0.5
  },
  text: {
    color: "black",
    fontSize: 24
  }
})


export default App;
