/**
 * This is the Checkout Page
 **/

// React native and others libraries imports
import React, { Component } from "react";
import { TouchableHighlight, TextInput, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  View,
  Grid,
  Col,
  Left,
  Right,
  Button,
  Icon,
  List,
  ListItem,
  Body,
  Radio,
  Text
} from "native-base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Navbar from "./NavbarHeader";
import helpers from "../helpers/helpers";

// create a component
class Checkout extends Component {
  static navigationOptions = {
    header: null,
    title: "Checkout"
  };

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      id: this.props.navigation.state.params.id,
      logueoToken: this.props.navigation.state.params.logueoToken,
      dataUser: this.props.navigation.state.params,
      idU: this.props.navigation.state.params.dataU,
      //  idUsuario: this.props.navigation.state.params.idU,

      totalParcial: 0,
      descuento: 0,
      totalPedido: 0,
      date1: "",
      date2: "",
      card: false,
      paypal: false,
      cash: false,
      bitcoin: false,
      googleWallet: false,
      passW: " ",
      email: " ",
      radioButton: "TarjetaCredito",
      domicilo: "",
      radioButtonChoose: ""
    };
  }

  // LogOut
  logOut() {
    this.setState({
      idUsuario: null,
      tokenSession_idUser: false,
      cartItems: []
    });
    alert("Saliste del Sistema");
    this.props.navigation.navigate("Home");
  }

  // Pago go to Profile and Clear ShopingCart

  clearCar() {
    helpers.removeAll(this);

    this.setState({ idU: "", logueoToken: "", cartItems: [], id: "" });
    // alert("Pedido En Proceso \n" + "Espera Notificación de Compra");
    // this.props.navigation.navigate("Home");
  }

  //  this.props.navigation.navigate("Profile");
  componentDidMount() {
    const cartItems = this.props.navigation.getParam("cartItems");
    this.setState({ cartItems: cartItems });

    var SubTotal = cartItems.reduce(function(accumulator, cartItems) {
      return (
        accumulator +
        parseFloat(cartItems.item.precioUnidadProducto) *
          parseInt(cartItems.Cantidad)
      );
    }, 0);

    // Descuento
    // const v1 = cartItems.map(p => p.item.precioUnidadProducto);
    // const v2 = cartItems.map(p => p.item.descuento);
    // const v3 = cartItems.map(p => p.item.codigoOferta);

    // Set the time for check out Pedido

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      date1: date + "/" + month + "/" + year + " "
    });
    this.setState({
      //Setting the value of the date time
      date2: hours + ":" + min + ":" + sec
    });

    this.setState({ totalParcial: SubTotal });
    // this.setState({ descuento: descuento });
  }

  /**--------------------------------IniciolMetodosRender-------------------------------------- */

  // Calculate ValorDescuentoProducto

  valorTotalDescuento() {
    var accumulatorOferta = [];
    var descuen = 0;
    var descuentoTotal = 0;

    this.state.cartItems.map(item => {
      if (item.item.codigoOferta == 1) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );

        descuen = item.item.descuento * item.Cantidad;
        accumulatorOferta.push(descuen);
      } else if (item.item.codigoOferta == 2) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );
        descuen =
          ((item.item.precioUnidadProducto * item.item.descuento) / 100) *
          item.Cantidad;
        accumulatorOferta.push(descuen);

        //  valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
      } else if (item.item.codigoOferta == 3 && item.Cantidad == 2) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );
        descuen = ((item.item.precioUnidadProducto * 50) / 100) * item.Cantidad;
        accumulatorOferta.push(descuen);

        //  valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
      } else if (item.item.codigoOferta == 4 && item.Cantidad == 3) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );
        descuen = item.item.precioUnidadProducto * 2 * 0.33 * item.Cantidad;
        //  valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
        accumulatorOferta.push(descuen);
      }
      //  console.log("resultado del metodo " + accumulatorOferta);
    });

    var descuentoTotal = accumulatorOferta.reduce(function(accumulator, Items) {
      return accumulator + parseInt(Items);
    }, 0);

    return descuentoTotal;
    // console.log("resultado del metodoAcumulado " + descuentoTotal);
    // this.setState({ descuento: descuentoTotal });
  }

  renderItems() {
    let items = [];
    this.state.cartItems.map((item, i) => {
      items.push(
        <ListItem key={i} style={{ marginLeft: 0 }}>
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {item.Cantidad > 1 ? item.Cantidad + "x" : null}
              {item.item.nombreProducto}
            </Text>
          </Body>
          <Right>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10
              }}
            >
              $ {item.item.precioUnidadProducto * item.Cantidad}
            </Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  async _retrieveDataSession() {
    try {
      const value = await AsyncStorage.getItem("mySessionStorageData");

      // We have data!!
      value = JSON.parse(value);
      // console.log(data.logueoToken, data.idUsuarioToken);
      console.log(data.logueoToken);
    } catch (error) {
      console.log("Error getting data");
    }
  }

  // getDataSession() {
  //   var data = sessionStorage.getItem("mySessionStorageData");
  //   data = JSON.parse(data);
  //   console.log(data.logueoToken, data.idUsuarioToken);
  // }

  // **********************          Info to PHP file    **********************
  // For Server Outside "http://andresteccorp.club/TesisAndres/sessionUserCheckout.php";
  // For local Server  const url = `http://192.168.0.19/TesisWeb/postDataInfoCheckout.php`
  // Funtion that send info to start the pedido process
  checkoutInfo = () => {
    var a = this.valorTotalDescuento();
    var b = this.state.totalParcial - a;

    // console.log(
    //   "El id----" +
    //     this.state.id +
    //     "El logueoToken----" +
    //     this.state.logueoToken +
    //     "El dataUser----" +
    //     this.state.dataUser +
    //     "El idU----" +
    //     this.state.idU
    // );

    const url = `http://andresteccorp.club/TesisAndres/sessionUserCheckout.php`;
    const uniqueArr = [
      ...new Set(this.state.cartItems.map(data => data.item.idComercio))
    ];
    /** Validacion de logueo para hacer compras */
    if (
      this.state.id == null &&
      this.state.logueoToken == null &&
      this.state.idU == null
    ) {
      alert(
        "No te Encuentras Logueado \n" +
          "Porfavor Loguearse para Continuar Procedimiento de Pago "
      );
    } else {
      // console.log(
      //   "Elementos del Post ---- " + this.state.idU.id,
      //   b,
      //   this.state.date1,
      //   this.state.date2,
      //   this.state.cartItems,
      //   uniqueArr.toString(),
      //   this.state.radioButtonChoose
      // );
      // Firts fectch to obtain all the info from user

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        // Convert your array as JSON Array
        body: JSON.stringify({
          userId: this.state.idU.id.toString(),
          granTotal: b,
          // granTotal: this.state.totalPedido,
          date1: this.state.date1,
          date2: this.state.date2,
          carrito: this.state.cartItems,
          idComercio: uniqueArr.toString(),
          radioButtonChoose: this.state.radioButtonChoose
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log("RespuestaServerCarrito *---*", responseJson);
          this.props.navigation.navigate("Home");
          alert("Pedido En Proceso \n" + "Espera Notificación de Compra");
          this.clearCar();
        })

        .catch(error => {
          console.log(error);
        });
    }
  };

  /**--------------------------------FinalMetodos-------------------------------------- */

  render() {
    // id logueoToken
    // try {
    //   var a = this.state.idU.id;
    //   var b = this.state.tokenSession_idUser.logueoToken;
    // } catch (error) {}
    // console.log("prueba" + a);

    // console.log("DesdeCheckOut El Id :", this.state.idU);
    const { navigate } = this.props.navigation;
    // const dataUserName = this.state.dataUser.dataU.name;
    // const dataUserCorreo = this.state.dataUser.dataU.email;
    // Get that Item from an Json Object
    let result = this.state.cartItems.map(a => a.item.idComercio);
    // Take duplicated values from an array
    const uniqueArr = [
      ...new Set(this.state.cartItems.map(data => data.item.idComercio))
    ];

    console.log("Desde checkOutCart info CartItems --", this.state.cartItems);
    // console.log("Date2" + this.state.date2);
    // console.log("el radioButton :", this.state.radioButton);
    // console.log("Desde checkOut--", uniqueArr);
    // console.log("Desde checkOut---", this.state.dataUser.dataU);
    //console.log(this.state.radioButtonChoose);

    // const keyCount = Object.keys(this.state.dataUser.dataU).length;

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
    );

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar left={left} title="CHECKOUT" />
        <Content padder>
          <TouchableHighlight onPress={() => navigate("LoginStack")}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#6fafc4",
                paddingTop: 20,
                paddingBottom: 20
              }}
            >
              <Icon
                name="ios-warning"
                style={{
                  color: "rgba(253, 253, 253, 0.9)",
                  marginRight: 20,
                  position: "absolute",
                  left: 11,
                  top: 15,
                  borderRightWidth: 1,
                  borderColor: "rgba(253, 253, 253, 0.2)",
                  paddingRight: 20
                }}
              />
              <Text style={{ color: "#fdfdfd", paddingLeft: 20 }}>
                Porfavor Loguearse para gestionar pedido
              </Text>
            </View>
          </TouchableHighlight>

          <View>
            <Text style={{ marginTop: 15, fontSize: 24 }}>
              Shipping - Pedido - Informacion
            </Text>
          </View>

          <Text style={{ marginTop: 15, fontSize: 18 }}>Tu Orden</Text>
          <View style={styles.invoice} />

          <List>{this.renderItems()}</List>

          <View style={styles.line} />

          <Grid style={{ paddingLeft: 10, paddingRight: 10, marginTop: 7 }}>
            <Col>
              <Text style={{ fontSize: 18, fontStyle: "italic" }}>
                Sub Total
              </Text>
            </Col>

            <Col>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                {" $ " + this.state.totalParcial}
              </Text>
            </Col>
          </Grid>
          <Grid style={{ paddingLeft: 10, paddingRight: 10, marginTop: 7 }}>
            <Col>
              <Text style={{ fontSize: 18, fontStyle: "italic" }}>
                Total Descuentos
              </Text>
            </Col>

            <Col>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#00BFFF"
                }}
              >
                {" $ " + this.valorTotalDescuento()}
              </Text>
            </Col>
          </Grid>
          <Grid style={{ paddingLeft: 10, paddingRight: 10, marginTop: 7 }}>
            <Col>
              <Text style={{ fontSize: 18, fontStyle: "italic" }}>
                Total Pedido
              </Text>
            </Col>

            <Col>
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                {" $ " + (this.state.totalParcial - this.valorTotalDescuento())}
              </Text>
            </Col>
          </Grid>

          <View>
            <Text style={{ marginTop: 15, marginBottom: 7, fontSize: 18 }}>
              Metodo de Pago
            </Text>
            <ListItem
              style={{
                borderWidth: 1,
                borderColor: "rgba(149, 165, 166, 0.3)",
                paddingLeft: 10,
                marginLeft: 0
              }}
            >
              <Text>TarjetaCredito</Text>
              <FAIcon
                name="cc-mastercard"
                size={20}
                color="#c0392b"
                style={{ marginLeft: 7 }}
              />
              <FAIcon
                name="cc-visa"
                size={20}
                color="#2980b9"
                style={{ marginLeft: 2 }}
              />
              <FAIcon
                name="cc-discover"
                size={20}
                color="#c0392b"
                style={{ marginLeft: 2 }}
              />
              <FAIcon
                name="cc-stripe"
                size={20}
                color="#2980b9"
                style={{ marginLeft: 2 }}
              />
              <Right>
                <Radio
                  selected={this.state.card}
                  onPress={() =>
                    this.setState({
                      card: true,
                      paypal: false,
                      cash: false,
                      bitcoin: false,
                      googleWallet: false,
                      radioButton: "TarjetaCredito",
                      radioButtonChoose: "TarjetaCredito"
                    })
                  }
                />
              </Right>
            </ListItem>
            <ListItem
              style={{
                borderWidth: 1,
                borderColor: "rgba(149, 165, 166, 0.3)",
                paddingLeft: 10,
                marginLeft: 0,
                borderTopWidth: 0
              }}
            >
              <Text>Paypal</Text>
              <FAIcon
                name="cc-paypal"
                size={20}
                color="#34495e"
                style={{ marginLeft: 7 }}
              />
              <Right>
                <Radio
                  selected={this.state.paypal}
                  onPress={() =>
                    this.setState({
                      card: false,
                      paypal: true,
                      cash: false,
                      bitcoin: false,
                      googleWallet: false,
                      radioButton: "Paypal",
                      radioButtonChoose: "Paypal"
                    })
                  }
                />
              </Right>
            </ListItem>
          </View>
          <ListItem
            style={{
              borderWidth: 1,
              borderColor: "rgba(149, 165, 166, 0.3)",
              paddingLeft: 10,
              marginLeft: 0,
              borderTopWidth: 0
            }}
          >
            <Text>Efectivo</Text>
            <FAIcon
              name="money"
              size={20}
              color="#34495e"
              style={{ marginLeft: 7 }}
            />
            <Right>
              <Radio
                selected={this.state.cash}
                onPress={() =>
                  this.setState({
                    card: false,
                    paypal: false,
                    cash: true,
                    bitcoin: false,
                    googleWallet: false,
                    radioButton: "Efectivo",
                    radioButtonChoose: "Efectivo"
                  })
                }
              />
            </Right>
          </ListItem>
          <ListItem
            style={{
              borderWidth: 1,
              borderColor: "rgba(149, 165, 166, 0.3)",
              paddingLeft: 10,
              marginLeft: 0,
              borderTopWidth: 0
            }}
          >
            <Text>Bitcoin</Text>
            <FAIcon
              name="bitcoin"
              size={20}
              color="#34495e"
              style={{ marginLeft: 7 }}
            />
            <Right>
              <Radio
                selected={this.state.bitcoin}
                onPress={() =>
                  this.setState({
                    card: false,
                    paypal: false,
                    cash: false,
                    bitcoin: true,
                    googleWallet: false,
                    radioButton: "Bitcoin",
                    radioButtonChoose: "Bitcoin"
                  })
                }
              />
            </Right>
          </ListItem>
          <ListItem
            style={{
              borderWidth: 1,
              borderColor: "rgba(149, 165, 166, 0.3)",
              paddingLeft: 10,
              marginLeft: 0,
              borderTopWidth: 0
            }}
          >
            <Text>Google Wallet</Text>
            <FAIcon
              name="google-wallet"
              size={20}
              color="#34495e"
              style={{ marginLeft: 7 }}
            />
            <Right>
              <Radio
                selected={this.state.googleWallet}
                onPress={() =>
                  this.setState({
                    card: false,
                    paypal: false,
                    cash: false,
                    bitcoin: false,
                    googleWallet: true,
                    radioButton: "googleWallet",
                    radioButtonChoose: "googleWallet"
                  })
                }
              />
            </Right>
          </ListItem>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Escribir domicilio de entrega del producto "
              placeholderTextColor="grey"
              numberOfLines={3}
              multiline={true}
              onChangeText={text => this.setState({ domicilo: text })}
            />
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
            <Button
              onPress={() => this.checkoutInfo()}
              style={{ backgroundColor: "#00BFFF" }}
              block
              iconLeft
            >
              <Icon name="ios-card" />
              <Text style={{ color: "#fdfdfd" }}>Pagos</Text>
            </Button>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10, paddingBottom: 7 }}>
            <Button
              onPress={() => this.logOut()}
              style={{ backgroundColor: "#00BFFF" }}
              block
              iconLeft
            >
              <Icon name="log-out" />
              <Text style={{ color: "#fdfdfd" }}>Salir</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

// define your styles
const styles = {
  invoice: {
    paddingLeft: 20,
    paddingRight: 20
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#bdc3c7"
  },
  textAreaContainer: {
    borderColor: "#bdc3c7",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start"
  }
};
//make this component available to the app
export default Checkout;
