//import libraries
import React, { Component } from "react";
import { Alert, AsyncStorage, Text, Image } from "react-native";

import Navbar from "../components/NavbarHeader";

import {
  Container,
  Content,
  View,
  Icon,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Grid,
  Col,
} from "native-base";
// create a component

class ShopingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      tokenValueSession: [],
    };
  }

  sessionData() {
    try {
      const { postId, otherParam } = this.props.route.params;
      console.log("El sessionData de ShopingCart" + otherParam);
      this.setState({ tokenValueSession: otherParam });
    } catch (e) {
      console.log("Error" + e);
    }
  }

  comWilm() {
    AsyncStorage.getItem("shopingCart", (err, res) => {
      if (!res) this.setState({ cartItems: [] });
      else this.setState({ cartItems: JSON.parse(res) });
    });
  }

  // componentDidMount() {
  //   this.comWilm();
  // }

  componentWillMount() {
    this.comWilm();
    this.sessionData();
    // this.props.navigation.addListener("willFocus", () => {
    //   this.comWilm();
    // });
  }

  itemClicked(item) {
    Alert.alert(
      item.descuento == null
        ? "Producto no en oferta"
        : "Producto en oferta" + "\n" + item.descripcionProducto
    );
  }

  // {item.item.precioUnidadProducto}

  renderItems() {
    let items = [];

    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem
          key={i}
          last={this.state.cartItems.length === i + 1}
          onPress={() => this.itemClicked(item)}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.imagenProducto }}
          />
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {item.Cantidad > 1 ? item.Cantidad + " X " : null}
              {item.nombreProducto}
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {" "}
              Precio Unidad $ {item.precioUnidadProducto}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {" "}
              {item.nombreTienda}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              {" "}
              {item.nombreProducto}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
                color: "#00BFFF",
              }}
            >
              {item.descuento == null ? "" : "Producto en oferta"}
            </Text>
          </Body>
          <Right>
            <Button
              style={{ marginLeft: -25 }}
              transparent
              onPress={() => this.removeItemPressed(item)}
            >
              <Icon
                size={30}
                style={{ fontSize: 30, color: "#95a5a6" }}
                name="ios-remove-circle-outline"
              />
            </Button>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  // ------------------------------------ Inicio Metodos del renderItem ---------------------------------------------------------------

  removeItemPressed(item) {
    Alert.alert(
      "Remover " + item.nombreProducto,
      "Estas seguro de remover este articulo del carrito de compras ?",
      [
        {
          text: "No",
          onPress: () => console.log(""),
          style: "cancel",
        },
        { text: "Yes", onPress: () => this.removeItem(item) },
      ]
    );
  }

  removeItem(itemToRemove) {
    let items = [];
    this.state.cartItems.map((item) => {
      if (JSON.stringify(item) !== JSON.stringify(itemToRemove))
        items.push(item);
    });
    this.setState({ cartItems: items });
    AsyncStorage.setItem("shopingCart", JSON.stringify(items));
  }

  removeAllPressed() {
    Alert.alert(
      "Vaciar carrito",
      "Estas seguro de quitar todos los articulos del carrito ",
      [
        {
          text: "No",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => this.removeAll() },
      ]
    );
  }

  removeAll() {
    this.setState({ cartItems: [] });
    AsyncStorage.setItem("shopingCart", JSON.stringify([]));
  }

  checkout() {
    const { navigate } = this.props.navigation;
    navigate("Checkout", {
      itemId: 90,
      otherParam: {
        cartItems: this.state.cartItems,
        sessionItems: this.state.tokenValueSession,

      },
    });
  }

  // ----------------------------------- Final metodos del renderItem-------------------------------------------------------

  render() {
    var productos = this.state.cartItems;
    console.log(productos);
    // for (let i = 0; i < productos.length; i++) {
    //   const element = productos[i];
    //   console.log("Desde Carrito" + element.item);
    // }
    console.log("Desde Carrito" + this.state.tokenValueSession);

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon name="arrow-back" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );
    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar left={left} title="Carrito" />
        {this.state.cartItems.length <= 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Icon
              name="ios-cart"
              size={55}
              style={{ fontSize: 55, color: "#95a5a6", marginBottom: 7 }}
            />
            <Text style={{ color: "#95a5a6" }}>Carrito Vacio</Text>
          </View>
        ) : (
          <Content style={{ paddingRight: 10 }}>
            <List>{this.renderItems()}</List>

            <Grid style={{ marginTop: 20, marginBottom: 10 }}>
              <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
                <Button
                  //  onPress= {() => console.log('Presiono CheckOut')}
                  onPress={() => this.checkout()}
                  //   onPress={() => navigate("CheckO", this.checkout.bind(this))}
                  style={{ borderWidth: 1, backgroundColor: "#00BFFF" }}
                  block
                  iconLeft
                >
                  <Icon name="ios-card" />
                  <Text
                    style={{
                      color: "#fdfdfd",
                      paddingLeft: 10,
                      paddingRight: 5,
                    }}
                  >
                    Checkout
                  </Text>
                </Button>
              </Col>
              <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
                <Button
                  onPress={() => this.removeAllPressed()}
                  style={{ borderWidth: 1, backgroundColor: "#00BFFF" }}
                  block
                  iconRight
                  transparent
                >
                  <Text
                    style={{
                      color: "#fdfdfd",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    Emtpy Cart
                  </Text>
                  <Icon style={{ color: "#fdfdfd" }} name="ios-trash" />
                </Button>
              </Col>
            </Grid>
          </Content>
        )}
      </Container>
    );
  }
}
//make this component available to the app
export default ShopingCart;
