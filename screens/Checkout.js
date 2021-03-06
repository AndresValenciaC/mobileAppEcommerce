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
  Text,
} from "native-base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Navbar from "../components/NavbarHeader";
import helpers from "../helpers/helpers";

// create a component checkout

class Checkout extends Component {
  static navigationOptions = {
    header: null,
    title: "Checkout",
  };

  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      idUsuario: "",
      nombreUsuario: "",
      tokenSession: false,
      TokenSessionStorage: "",
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
      text: "",
      radioButtonChoose: "",
    };
  }

  //  this.props.navigation.navigate("Profile");
  componentWillMount() {
    const { postId, otherParam } = this.props.route.params;
    const cartItems = otherParam;

    try {
      // Variables de Session
      const idUsuario = cartItems.sessionItems.idUsuario;
      const nombreUsuario = cartItems.sessionItems.nombreUsuario;
      const tokenSession = cartItems.sessionItems.tokenSession;
      console.log(
        "Desde compoWill-Checkout" +
          idUsuario +
          nombreUsuario +
          tokenSession +
          cartItems
      );
      this.setState({
        cartItems: cartItems,
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        tokenSession: tokenSession,
      });
    } catch (e) {
      console.log("Error" + e);
    }

    // Descuento
    // const v1 = cartItems.map(p => p.item.precioUnidadProducto);
    // const v2 = cartItems.map(p => p.item.descuento);
    // const v3 = cartItems.map(p => p.item.codigoOferta);
    // this.setState({ descuento: descuento });
  }

  componentDidMount() {
    this.setTimeOrder();
    this._retrieveDataAsynStor();
  }

  /**--------------------------------IniciolMetodosRender-------------------------------------- */

  _retrieveDataAsynStor() {
    try {
      const value = AsyncStorage.getItem("!@storage_Key@@!");
      console.log("El value" + value);
      console.log(" _retrieveData1" + value);
      if (value !== null) this.setState({ TokenSessionStorage: value });

      console.log(" _retrieveData2" + this.state.valueToken);
    } catch (error) {}
  }

  logOut() {
    this.setState({
      tokenSession: false,
      idUsuario: " ",
    });
    const { navigate } = this.props.navigation;
    alert("Saliste del Sistema");
    navigate("Login");
  }

  setTimeOrder() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      date1: date + "/" + month + "/" + year + " ",
    });
    this.setState({
      //Setting the value of the date time
      date2: hours + ":" + min + ":" + sec,
    });
  }

  valorSubTotalOrden() {
    var stateCartItems = this.state.cartItems.cartItems;
    var SubTotal = stateCartItems.reduce(function (accumulator, cartItems) {
      return (
        accumulator +
        parseFloat(cartItems.precioUnidadProducto) *
          parseInt(cartItems.Cantidad)
      );
    }, 0);

    return SubTotal;
  }

  valorTotalDescuento() {
    var accumulatorOferta = [];
    var descuen = 0;
    var descuentoTotal = 0;
    var stateCartItems = this.state.cartItems.cartItems;
    stateCartItems.map((item) => {
      // Bono
      if (item.codigoOferta == 1) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );

        descuen = item.descuento * item.Cantidad;
        accumulatorOferta.push(descuen);
        // descuento
      } else if (item.codigoOferta == 2) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );
        descuen =
          ((item.precioUnidadProducto * item.descuento) / 100) * item.Cantidad;
        accumulatorOferta.push(descuen);

        //  valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
        // Promo 2*1
      } else if (item.codigoOferta == 3 && item.Cantidad == 2) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );
        descuen = ((item.precioUnidadProducto * 50) / 100) * item.Cantidad;
        accumulatorOferta.push(descuen);

        //  valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
        // Promo 3*1
      } else if (item.codigoOferta == 4 && item.Cantidad == 3) {
        // console.log(
        //   item.item.codigoOferta,
        //   item.item.precioUnidadProducto,
        //   item.item.descuento,
        //   item.Cantidad
        // );
        descuen = item.precioUnidadProducto * 2 * 0.33 * item.Cantidad;
        //  valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
        accumulatorOferta.push(descuen);
      }
      //  console.log("resultado del metodo " + accumulatorOferta);
    });

    var descuentoTotal = accumulatorOferta.reduce(function (
      accumulator,
      Items
    ) {
      return accumulator + parseInt(Items);
    },
    0);

    return descuentoTotal;
    // console.log("resultado del metodoAcumulado " + descuentoTotal);
    // this.setState({ descuento: descuentoTotal });
  }

  renderItems() {
    const stateCartItems = this.state.cartItems.cartItems;
    let items = [];

    stateCartItems.map((item, i) => {
      items.push(
        <ListItem key={i} style={{ marginLeft: 0 }}>
          <Body style={{ paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>
              {item.Cantidad > 1 ? item.Cantidad + "x" : null}
              {item.nombreProducto}
            </Text>
          </Body>
          <Right>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              $ {item.precioUnidadProducto * item.Cantidad}
            </Text>
          </Right>
        </ListItem>
      );
    });
    return items;
  }

  clearCheckOut() {
    /** Con este metodo se limpia el AsyncStorage con el nombre shopingCart de la aplicacion
donde se limpia el carrito y el checkout al hacer el pedido
helpers.removeAll(this);
*/

    AsyncStorage.setItem("shopingCart", JSON.stringify([]));

    this.setState({
      nombreUsuario: "",
      idUsuario: "",
      tokenSession: false,
    });
  }

  // **********************          Info to PHP file    **********************
  // For Server Outside "http://andresteccorp.club/TesisAndres/sessionUserCheckout.php";
  // For local Server  const url = `http://192.168.0.19/TesisWeb/postDataInfoCheckout.php`
  // Funtion that send info to start the pedido process
  checkoutInfo = () => {
    var a = this.valorTotalDescuento();
    var b = this.valorSubTotalOrden() - a;
    var stateCartItems = this.state.cartItems.cartItems;
    var date1 = this.state.date1;
    var date2 = this.state.date2;
    var idUsuario = this.state.idUsuario;
    var logueoToken = this.state.tokenSession;
    stateCartItems.sort((a, b) => (a.idComercio > b.idComercio ? 1 : -1));
    // console.log(stateCartItems);

    const idComercio = [
      ...new Set(stateCartItems.map((data) => data.idComercio)),
    ];

    // const idCom = stateCartItems.map((id) => id.idComercio);

    const url = `http://andresteccorp.club/ecom_val/sessionUserCheckout.php`;

    console.log(
      "Desde el metodo  checkoutInfo El idUsuario----" +
        this.state.idUsuario +
        "El nombreUsuario----" +
        this.state.nombreUsuario +
        "El logueoToken----" +
        this.state.tokenSession +
        "El TokenSessionStorage----" +
        this.state.TokenSessionStorage,
      "El date1----" + this.state.date1,
      "El date2----" + this.state.date2,
      "El carrito1----" + stateCartItems,
      "El carrito2----" + this.state.CartItems,
      "El radioButtonChoose----" + this.state.radioButtonChoose,
      "El granTotal ----" + b,
      "El idComercio ----" + idComercio,
      // "El idCom ----" + idCom,
      "El tokenSession ----" + this.state.tokenSession,
      "El domicilio ----" + this.state.domicilio
    );

    //const url = `http://andresteccorp.club/TesisAndres/sessionUserCheckout.php`;
    // var stateCartItems = this.state.cartItems.cartItems;
    // const uniqueArr = [
    //   ...new Set(stateCartItems.map((data) => data.item.idComercio)),
    // ];

    if (logueoToken === true) {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // Convert your array as JSON Array
        body: JSON.stringify({
          userId: idUsuario,
          granTotal: b,
          date1: date1,
          date2: date2,
          carrito: stateCartItems,
          idComercio: idComercio,
          radioButtonChoose: this.state.radioButtonChoose,
          domicilio: this.state.text,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("RespuestaServerCloud **----------**", responseJson);
          if (responseJson) {
            alert("Pedido En Proceso \n" + "Espera Notificación de Compra");

            this.props.navigation.navigate("Home");
            this.clearCheckOut();
          } else {
            alert(
              "Problemas en el proceso del pedido \n" + "Pedido no desarrollado"
            );
          }
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Porfavor loguearse \n" + "para continuar con el pedido");
    }
  };

  /**--------------------------------FinalMetodos-------------------------------------- */
  /**--------------------------------Inicio del Render -------------------------------------- */
  render() {
    const { navigate } = this.props.navigation;

    //  console.log("DomicilioText --- " + this.state.text);

    // Get that Item from an Json Object
    // let result = this.state.cartItems.map((a) => a.item.idComercio);
    // Take duplicated values from an array
    // const uniqueArr = [
    //   ...new Set(this.state.cartItems.map((data) => data.item.idComercio)),
    // ];
    // console.log("El TotalPacial" + this.valorSubTotalOrden());

    //  console.log(
    //    " Desde renderCheckOut info cart ------- ",
    //    this.state.cartItems

    // console.log(
    //   "Desde renderCheckOut info TokenSessionStorage --",
    //   this.state.TokenSessionStorage
    // );

    // const uniqueArr = [
    //   ...new Set(this.state.cartItems.cartItems.map((data) => data.idComercio)),
    // ];
    // console.log("Desde renderCheckOut uniqueArr --" + uniqueArr);

    // console.log("Desde checkOutCart" + a);
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
          <TouchableHighlight onPress={() => navigate("Login")}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#6fafc4",
                paddingTop: 20,
                paddingBottom: 20,
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
                  paddingRight: 20,
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
                  fontWeight: "bold",
                }}
              >
                {" $ " + this.valorSubTotalOrden()}
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
                  color: "#00BFFF",
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
                  fontWeight: "bold",
                }}
              >
                {" $ " +
                  (this.valorSubTotalOrden() - this.valorTotalDescuento())}
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
                marginLeft: 0,
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
                      radioButtonChoose: "TarjetaCredito",
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
                borderTopWidth: 0,
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
                      radioButtonChoose: "Paypal",
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
              borderTopWidth: 0,
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
                    radioButtonChoose: "Efectivo",
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
              borderTopWidth: 0,
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
                    radioButtonChoose: "Bitcoin",
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
              borderTopWidth: 0,
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
                    radioButtonChoose: "googleWallet",
                  })
                }
              />
            </Right>
          </ListItem>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Escribir domicilio de entrega del producto o sugerencias del pedido"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              // onChangeText={(text) => this.setState({ domicilo: text })}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
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

  /**--------------------------------Final del Render -------------------------------------- */
}

// define your styles
const styles = {
  invoice: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#bdc3c7",
  },
  textAreaContainer: {
    borderColor: "#bdc3c7",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 85,
    justifyContent: "flex-start",
  },
};
//make this component available to the app
export default Checkout;
