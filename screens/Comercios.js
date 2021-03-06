//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Right, Left, Button, Icon } from "native-base";

import SearchEC from "../components/SearchEcommerce";
import Navbar from "../components/NavbarHeader";
// Importamos la Data local
//import { negocio } from "../Api_homeData/Api_homeData";
//const dataN = negocio();

// create a component
class Comercios extends Component {
  // Remove top navigation Bar
  static navigationOptions = {
    header: null,
    title: "Comercios",
  };

  constructor(props) {
    super(props);
    this.state = { dataSource: [] };
  }

  // Metodo de renderizacion de data

  // Metodos 1 Costum Layout for each row of Flat list

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", marginBottom: 3 }}
        onPress={() =>
          navigate("DetallesNegocio", { itemId: 80, otherParam: item })
        }
      >
        <Image
          style={{ width: 80, height: 80, margin: 5 }}
          source={{ uri: item.imagenComercio }}
        />
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}>
          <Text style={{ fontSize: 19, marginBottom: 10 }}>
            {item.nombreTienda}
          </Text>
          <Text style={{ fontSize: 16 }}>{item.detalleComercio}</Text>
          <Text style={{ fontSize: 16 }}>{item.direccionComercio}</Text>
          <Text style={{ fontSize: 16 }}>{item.telefonoComercio}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Metodos 2 render Data from api
  // For local Host -- const url = `http://192.168.0.19/TesisWeb/comercios.php`
  componentDidMount() {
    const url = "http://andresteccorp.club/ecom_val/comercios.php";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          //dataSource: responseJson.book_array
          // dataSource: dataN
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Metodos 3 Separador de rows

  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "black" }} />
    );
  };

  render() {
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.navigate("Carrito")}>
          <Icon name="ios-cart" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Right>
    );

    return (
      <ScrollView>
        <View>
          <Navbar right={right} title="Comercios" />
          <SearchEC navigation={this.props.navigation} />
        </View>
        <View>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.idComercio}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Comercios;
