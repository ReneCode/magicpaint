/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ListView, Keyboard } from 'react-native';

import Header from "./Header";
import Footer from "./Footer";
import Row from "./Row";

class App extends Component {
  constructor(props) {
    super(props);

    // create data source
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      allComplete: false,
      value: "",
      items: [],
      dataSource: ds.cloneWithRows([])
    };

    // this.handleAddItem = this.handleAddItem.bind(this);
    // this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  setSource = (items, itemsDatasource, otherState = {}) => {
    this.setState({
      ...otherState,
      items: items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource)
    })
  }

  handleToggleAllComplete = () => {
    const complete = !this.state.allComplete
    const newItems = this.state.items.map(item => {
      return {
        ...item,
        complete: complete
      }
    })
    this.setSource(newItems, newItems, { allComplete: complete });
    // this.setState({
    //   allComplete: complete,
    //   items: newItems
    // });
  }

  handleAddItem = () => {
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
    this.setSource(newItems, newItems, { value: "" })
    // this.setState({
    //   items: newItems,
    //   value: ""
    // })

  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onToggleAllComplete={this.handleToggleAllComplete}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}   // hide keyboard on scrolling
            renderRow={({ key, ...value }) => {
              return (
                <Row
                  key={key}
                  {...value}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => {
              return (
                <View
                  key={rowId}
                  style={styles.separator}
                />
              )
            }}
          />
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
  },
  list: {
    backgroundColor: "#fff"
  },
  separator: {
    borderWidth: 1,
    borderColor: "#f5f5f5"
  }

})


export default App;
