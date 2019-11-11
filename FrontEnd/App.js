import React, { Component } from 'react'
// import React from 'react';
import { View, Text, Button } from "react-native"
import axios from "axios"
import Navigator from "./components/Navigator"
// export default function App() {



export default class App extends Component {

  state = {
    host: "192.168.6.106",
    users: {},
    user: {},
    storeItems: [],
  }



  render() {

    return (
      <View>
        <Navigator />
      </View >
    );
  }
}
