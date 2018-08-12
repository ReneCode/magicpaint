/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Header from "./Header";
import Footer from "./Footer";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "abc",
      items: []
    };

    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem() {
    if (!this.state.value) {
      // do not add empty item
      return;
    }
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];
    this.setState({
      items: newItems,
      value: ""
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
        />
        <View style={styles.content}>
          <Text>
            {this.state.value}
          </Text>
        </View>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1
  }
})


export default App;
