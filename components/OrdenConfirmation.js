import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import { Header } from "react-native-elements";
import Navbar from "./NavbarHeader";

export default class OrdenConfirmation extends Component {
  static navigationOptions = {
    header: null,
    title: "OrdenConfirmation",
  };
  constructor(props) {
    super(props);
    this.state = {
      carritoPedido: [],
      total: "",
      passW: " ",
      email: " ",
    };
  }
  componentWillMount() {
    const cartItem = this.props.navigation.getParam("cartItems");
    const total = this.props.navigation.getParam("total");
    const passW = this.props.navigation.getParam("passW");
    const email = this.props.navigation.getParam("email");

    this.setState({ carritoPedido: cartItem });
    this.setState({ total: total });
    this.setState({ passW: passW });
    this.setState({ email: email });
  }

  Navigate() {
    this.props.navigation.navigate("Profile", {});
  }

  // Send all the data to Server so Admin Web User will recive the information

  sendInfo = () => {
    const url = `http://andresteccorp.club/ecom_val/infoPedidoProceso.php`;

    const { carritoPedido } = this.state;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // Convert your array as JSON Array
      body: JSON.stringify({
        carrito: carritoPedido,
      }),
    })
      .then((res) => res.json())

      .then(
        (data) => console.log("--- Adentro del Post OrdenCon --", data),
        this.Navigate()
      )

      .catch(function (error) {
        console.log("-------- error ------- " + error);
        alert("result:" + error);
      });
  };

  render() {
    //  console.log(" -- Desde Orden Confirmation --",this.state.carritoPedido);
    correo = this.state.email;
    total = this.state.total;

    return (
      <View>
        <View
          style={{
            fontSize: 40,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 25,
            marginTop: 25,
          }}
        >
          <Avatar
            size={225}
            rounded
            icon={{ name: "Confirmado", type: "font-awesome" }}
            title="Gracias Tu Orden Se Confirmo"
            //onPress={() => console.log("Works!")}
            onPress={() => this.sendInfo()}
            activeOpacity={0.7}
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Symbol_kept_vote.svg/996px-Symbol_kept_vote.svg.png",
            }}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Muchisimas Gracias : {correo}
          </Text>

          <Text
            style={{
              fontSize: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Tu Orden Se Encuentra en Proceso
          </Text>
          <Text
            style={{
              fontSize: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Dar click en icono para continuar
          </Text>
          <Text
            style={{
              fontSize: 15,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            Tu Orden Numero es #
          </Text>

          <Text
            style={{
              fontSize: 15,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            Tu Orden Total es $ {total}
          </Text>
        </View>

        {this.state.carritoPedido.map((l, i) => (
          <ListItem
            key={i}
            leftAvatar={{ source: { uri: l.item.imagenProducto } }}
            title={l.item.nombreProducto}
            subtitle={l.item.descripcionProducto}
          />
        ))}
      </View>
    );
  }
}
