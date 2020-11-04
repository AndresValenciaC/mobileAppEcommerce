//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

//import { negocio } from "../Api_homeData/Api_homeData";

const { width, height } = Dimensions.get("window");

// create a component
class SearchEcommerce extends Component {
  static navigationOptions = {
    title: "SearchOferta",
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dataFilter: "",
      dataOfertas: "",
    };
  }

  //Data from Php file comercios.php
  // for Local Host const url = `http://192.168.0.19/TesisWeb/comercios.php`
  componentDidMount() {
    const url = "http://andresteccorp.club/TesisAndres/ofertas.php";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          //dataSource: responseJson.book_array
          // dataSource: dataN
          dataOfertas: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // metodo de filtracion de data

  filter(text) {
    const data = this.state.dataOfertas;
    const newData = data.filter(function (item) {
      const itemData = item.nombreProducto.toUpperCase().trim();

      const textData = text.toUpperCase().trim();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataFilter: newData,
      text: text,
    });
  }

  //********************************* */

  deleteData() {
    this.setState({
      text: "",
      dataFilter: "",
    });
  }

  _renderItem(item) {
    const { navigate } = this.props.navigation;
    console.log(this.state.dataOfertas);
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          marginBottom: 10,
        }}
        onPress={() => navigate("DetallesNP", { otherParam: item })}
      >
        <View>
          <Image
            key={item.id}
            style={styles.image}
            source={{ uri: item.imagenProducto }}
          />

          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            {item.nombreTienda}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {" "}
            Precio ${item.precioUnidadProducto}
          </Text>
          <Text style={{ fontSize: 15 }}> Promocion {item.descuento}</Text>
          <Text style={{ fontSize: 15 }}> {item.descripcionProducto}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="search"
            color="grey"
            size={18}
            style={styles.searchIcon}
          />
          <TextInput
            value={this.state.text}
            onChangeText={(text) => this.filter(text)}
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="white"
            keyboardAppearance="dark"
            autoFocus={true}
          />
          {this.state.text ? (
            <TouchableWithoutFeedback onPress={() => this.deleteData()}>
              <Icon
                name="times-circle"
                color="grey"
                size={25}
                style={styles.iconInputClose}
              />
            </TouchableWithoutFeedback>
          ) : null}

          <TouchableWithoutFeedback style={styles.cancelButton}>
            <View style={styles.containerButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView>
          <FlatList
            style={{ marginHorizontal: 5 }}
            data={this.state.dataFilter}
            numColumns={3}
            columnWrapperStyle={{ marginTop: 5, marginLeft: 5 }}
            renderItem={({ item }) => this._renderItem(item)}
            keyExtractor={(item) => item.idProducto}
          />
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaea",
  },
  header: {
    height: 50,
    backgroundColor: "#181818",
    borderBottomWidth: 1,
    borderColor: "#3a3a3a",
    paddingBottom: 5,

    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    height: 35,
    backgroundColor: "#323232",
    width: width - width / 4,
    marginHorizontal: 10,
    paddingLeft: 30,
    borderRadius: 3,
  },
  cancelButtonText: {
    color: "white",
  },
  searchIcon: {
    position: "absolute",
    top: 12,
    left: 15,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  iconInputClose: {
    position: "absolute",
    top: 10,
    right: 90,
    backgroundColor: "transparent",
  },
  image: {
    marginRight: 5,
    width: 115,
    height: 170,
  },
});

//make this component available to the app
export default SearchEcommerce;
