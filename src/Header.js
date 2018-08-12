/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onAddItem}
          placeholder="todo"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

  },
  input: {
    flex: 1,
    height: 50
  }
})

export default Header;
