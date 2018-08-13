/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, ActivityIndicator, View, ListView, Keyboard, AsyncStorage } from 'react-native';

import Header from "./Header";
import Footer from "./Footer";
import Row from "./Row";

const filterItems = (filter, items) => {
  return items.filter(item => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete;
  })
}

class App extends Component {
  constructor(props) {
    super(props);

    // create data source
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      loading: true,
      allComplete: false,
      value: "",
      filter: "ALL",
      items: [],
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("items")
      .then((json) => {
        try {
          const items = JSON.parse(json);
          this.setSource(
            items,
            items,
            { loading: false }
          );
        } catch (e) {
          this.setState({
            loading: false
          })
        }
      })
  }

  setSource = (items, itemsDatasource, otherState = {}) => {
    this.setState({
      ...otherState,
      items: items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource)
    })
    AsyncStorage.setItem("items", JSON.stringify(items));
  }

  handleRemoveItem = (key) => {
    const newItems = this.state.items.filter(item => item.key !== key);
    this.setSource(newItems,
      filterItems(this.state.filter, newItems)
    );
  }

  handleToggleComplete = (key, complete) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) {
        return item;
      } else {
        return {
          ...item,
          complete
        }
      }
    });
    this.setSource(
      newItems,
      filterItems(this.state.filter, newItems)
    );
  }

  handleToggleAllComplete = () => {
    const complete = !this.state.allComplete
    const newItems = this.state.items.map(item => {
      return {
        ...item,
        complete: complete
      }
    })
    this.setSource(
      newItems,
      filterItems(this.state.filter, newItems),
      { allComplete: complete }
    );
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
    this.setSource(
      newItems,
      filterItems(this.state.filter, newItems),
      { value: "" }
    )
  }

  handleFilter = (filter) => {
    this.setSource(
      this.state.items,
      filterItems(filter, this.state.items),
      { filter }
    );
  }

  handleClearComplete = () => {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(
      newItems,
      filterItems(this.state.filter, newItems),
    );
  }

  handleUpdateText = (key, text) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) {
        return item;
      } else {
        return {
          ...item,
          text
        }
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleToggleEditing = (key, editing) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) {
        return item;
      } else {
        return {
          ...item,
          editing
        }
      }
    })
    this.setSource(newItems, filterItems(this.state.filter, newItems))
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
                  onUpdate={(text) => this.handleUpdateText(key, text)}
                  onToggleEdit={(editing) => this.handleToggleEditing(key, editing)}
                  onComplete={(complete) => this.handleToggleComplete(key, complete)}
                  onRemove={() => this.handleRemoveItem(key)}
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
        <Footer
          count={filterItems("ACTIVE", this.state.items).length}
          filter={this.state.filter}
          onFilter={this.handleFilter}
          onClearComplete={this.handleClearComplete}
        />
        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator
            animating
            size="large"
          />
        </View>}
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
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)"
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
