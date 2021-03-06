import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";

import NavBar from "../components/NavbarHeader";
import { Left, Button, Icon, Container, Item } from "native-base";

// All User Paid Invoids

export default class PedidoUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProfile: [],
      dataPedido: [],
    };
  }

  componentWillMount() {
    const { postId, otherParam } = this.props.route.params;

    this.setState({
      dataProfile: otherParam,
    });
  }

  componentDidMount() {
    this.datosPedido();
  }

  datosPedido() {
    var idUser = this.state.dataProfile.id;
    console.log("Pedido UserId" + idUser);

    fetch("http://andresteccorp.club/ecom_val/pedidosUsuario.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idU: parseInt(idUser),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == "NoPedidos") {
          alert("Usuario no Cuenta\n" + "Con Pedidos");
        } else {
          this.setState({
            dataPedido: responseJson,
          });
          console.log("Respuesta del Json Pedidos" + responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Render Pedidos

  totalItemPedido(data) {
    const cantidad = data.cantidadCompra;
    const precio = data.precioUnidad;
    const subtotal = precio * cantidad;
    return subtotal;
  }
  // totalFacturaPedido() {
  //   let a = this.state.dataPedido;
  //   let totalP = 0;

  //   a.forEach(item => {
  //     totalP += item.cantidadCompra * item.precioUnidad;
  //   });
  //   return totalP;
  // }

  totalFacturaPedido(data) {
    var a = this.state.totalItemPedido;
    //var b = data.idPedido;
    var granTotal = 0;
    var acum = 0;

    granTotal += a;

    return granTotal;
  }

  facturasUsuarioList(data) {
    return (
      <View>
        <Text style={styles.description}>Pedido # {data.idPedido}</Text>
        <Text style={styles.description}>Producto: {data.nombreProducto}</Text>
        <Text style={styles.description}>
          Cantidad Compra: {data.cantidadCompra}
        </Text>
        <Text style={styles.description}>
          Comercio Compra: {data.nombreTienda}
        </Text>
        <Text style={styles.description}>
          Estado Compra:{" "}
          {data.pedidoEstado == 1 ? (
            <Text
              style={{
                fontSize: 20,
                color: "#00BFFF",
                fontWeight: "100",
              }}
            >
              Proceso en Linea
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 20,
                color: "#ff0000",
                fontWeight: "100",
              }}
            >
              Cancelado
            </Text>
          )}
        </Text>
        <Text style={styles.description}>
          Precio Producto: {data.precioUnidad}
        </Text>
        <Text style={styles.description}>Fecha Pedido: {data.fechaPedido}</Text>
        <Text style={styles.description}>Hora Pedido: {data.horaPedido}</Text>

        <Text style={styles.description}>
          Total Item Pedido:
          {this.totalItemPedido(data)}
        </Text>

        <View style={styles.separator} />
        <View style={styles.separator} />
      </View>
    );
  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon size={38} style={{ fontSize: 38 }} name="arrow-back" />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <NavBar left={left} title=" FacturasUsuario" />

        <View>
          <View style={styles.infoPedido}>
            <Text
              style={{
                fontSize: 40,
                color: "#696969",
                fontWeight: "600",
              }}
            >
              Mis Pedidos
            </Text>
          </View>
        </View>

        <ScrollView>
          <View>
            <FlatList
              data={this.state.dataPedido}
              renderItem={({ item }) => this.facturasUsuarioList(item)}
              keyExtractor={(item, index) => "key" + index}
            />

            <View style={styles.separator} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// define your styles

const styles = StyleSheet.create({
  imagen: {
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 2,
    alignItems: "center",
    height: 180,
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 100,
  },
  separator: {
    height: 2,

    backgroundColor: "#eeeeee",
    marginTop: 10,
    marginHorizontal: 30,
  },
  infoPedido: {
    paddingLeft: 15,
  },

  name: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  bodyContent: {
    marginTop: 5,
    alignItems: "center",
    padding: 10,
  },
  name1: {
    fontSize: 30,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 20,
    color: "#00BFFF",
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "left",
    paddingLeft: 15,
  },
  buttonContainer: {
    marginTop: 10,
    height: 35,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
