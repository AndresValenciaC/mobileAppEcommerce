'use strict'
import React, { PropTypes, Component } from 'react'
import {
    View, Dimensions, StyleSheet, Image, Text, TouchableOpacity,Alert
} from 'react-native'

import colors from '../colors'

const { width } = Dimensions.get('window')
const prdWidth = (width - 45) / 2

class GridProductThumb extends Component {
    constructor(props) {
        super(props)
    }
    _metodo() {
        Alert.alert(
            'clik para dar ??',
        )
    }
    render() {
        return (
          <TouchableOpacity
            onPress={this.props.onPress}
            style={styles.holder}
          >
            <Image
              style={styles.productImage}
              source={{ uri: this.props.imageUri }}
            />
            <Text
              style={styles.name}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {this.props.name}
            </Text>

            <Text
              style={styles.nombreLocal}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {this.props.nombreLocal}
            </Text>

            <Text>${this.props.prize}</Text>
            
          </TouchableOpacity>
        );
    }
}

/** After props.prize
 * <View style={styles.promotionHolder}>
              <Text
                style={[
                  styles.name,
                  { textDecorationLine: "line-through" }
                ]}
              >
                ${this.props.regularPrize}
              </Text>
              <Text style={styles.precioDescuento}>
                {" "}
                | {this.props.discountPercent}% off
              </Text>
            </View>
 */


const styles = StyleSheet.create({
    holder: {
        width: prdWidth,
        height: prdWidth + 110
    },
    productImage: {
        width: prdWidth,
        height: prdWidth,
        borderWidth: 0.5,
        borderColor: colors.bd_input
    },
    name: {
        marginTop: 6,
        marginBottom: 2,
        color: colors.txt_description
    },
    nombreLocal:{
        marginTop: 2,
        marginBottom: 2,
        color: colors.txt_description
    },
    promotionHolder: {
        flexDirection: 'row'
    },
  precioDescuento:{
      marginTop: 4,
      marginBottom: 2,
    color: "#FF7F50"
    }
})

module.exports = GridProductThumb
