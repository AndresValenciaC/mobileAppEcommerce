//import libraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Grid from "../components/Grid";
import Container from "../components/Container";

import Navbar from "../components/NavbarHeader";
import { Right, Left, Button, Icon } from "native-base";

// create a component
class DetallesNegocio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataParam: [],
      nombreComercio: this.props.route.params.otherParam.nombreTienda,

      dataR: [],
    };
  }

  //  For local Host const url = `http://192.168.0.19/TesisWeb/infoComerciosProducto.php`

  componentWillMount() {
    const { postId, otherParam } = this.props.route.params;
    this.setState({ dataParam: otherParam });
    const nombreComercio = this.state.nombreComercio;

    fetch("http://andresteccorp.club/ecom_val/infoComerciosProducto.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreComercio: nombreComercio,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataR: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static navigationOptions = {
    header: null,
    title: "DetallesNegocios",
  };

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    // const { params } = this.props.navigation.state;
    var descripcionProducto = item.descripcionProducto;

    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}
        onPress={() => navigate("DetallesNP", { itemId: 86, otherParam: item })}
      >
        <Grid>
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.imagenProducto }}
            key={item.idProducto}
          />
          <View>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>
              {item.nombreProducto}
            </Text>

            <Text style={{ fontSize: 15, marginBottom: 20 }}>
              $ {item.precioUnidadProducto}
            </Text>
          </View>
        </Grid>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return (
      <View style={{ height: 3, width: "100%", backgroundColor: "black" }} />
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const dataParam = this.state.dataParam;
    const imagenComercio = dataParam["imagenComercio"];
    const nombreTienda = dataParam["nombreTienda"];

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon name="arrow-back" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );

    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => navigate("Carrito")}>
          <Icon name="ios-cart" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Right>
    );

    return (
      <Container>
        <Navbar left={left} right={right} title="DetalleComercio" />
        <Image style={styles.image} source={{ uri: imagenComercio }} />
        <Text style={styles.textTitle}>{nombreTienda} Productos </Text>

        <ScrollView>
          <View>
            <FlatList
              style={{
                marginHorizontal: 5,
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
              }}
              data={this.state.dataR}
              numColumns={3}
              columnWrapperStyle={{
                marginTop: 5,
                marginLeft: 5,
                marginRight: 5,
              }}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.idProducto}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// define your styles

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 170,
    margin: 5,
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 10,
  },
  textSumary: {
    fontSize: 20,
    fontWeight: "300",
    marginLeft: 10,
    marginBottom: 10,
  },

  textRimagen: {
    fontSize: 25,
    fontWeight: "400",

    flex: 1,
    justifyContent: "center",
    marginLeft: 5,
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 10,
    marginHorizontal: 30,
  },
});

//make this component available to the app
export default DetallesNegocio;
