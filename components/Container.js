'use strict'
import React, { Component } from 'react'
import {
    StatusBar, StyleSheet, View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import colors from './colors'
class Container extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={ styles.container }>
                <StatusBar hidden={ true }/>
                { this.props.children }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
       
        flex: 1
    }
  
})

module.exports = Container
