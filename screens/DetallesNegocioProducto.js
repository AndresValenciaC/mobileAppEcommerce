import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  AsyncStorage,
} from "react-native";

import { Button, Left, Right } from "native-base";

import { Icon } from "react-native-elements";
import Navbar from "../components/NavbarHeader";

class DetallesNegocioProducto extends Component {
  static navigationOptions = {
    header: null,
    title: "DetallesNegocioProductos",
  };

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      quantity: 1,
      valorDescuentoTotalP: 0,
    };
  }

  clickEventListener() {
    //   Alert.alert("Success", "Product has beed added to cart")
    //   () => navigate("Cart", { item: item })
  }

  // Metodos

  componentWillMount() {
    const { postId, otherParam } = this.props.route.params;

    this.setState({ product: otherParam });
    // When you need to execute a function at opening window
    // this.props.navigation.addListener("willFocus", () => {
    //   this.valorTotalDescuento();
    // });
  }

  renderImages() {
    let images = [];
    this.state.product.imageUri.map((img, i) => {
      images.push(
        <TouchableWithoutFeedback key={i} onPress={() => this.openGallery(i)}>
          <Image
            source={{ uri: img }}
            style={{ width: Dimensions.get("window").width, height: 350 }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      );
    });
    return images;
  }

  // Calculate ValorDescuentoProducto

  // valorTotalDescuento() {
  //   var producto = this.state.product;
  //   var a = Object.values(producto.item["precioUnidadProducto"]);
  //   var b = Object.values(producto.item["descuento"]);
  //   var c = Object.values(producto.item["codigoOferta"]);
  //   var valorActual = a.join("");
  //   var valorDescuento = b.join("");
  //   var codigoOferta = c.join("");

  //   var valorTotalDescuento = 0;

  //   if (codigoOferta == 1) {
  //     valorTotalDescuento = valorActual - valorDescuento;
  //   } else if (codigoOferta == 2 || codigoOferta == 3) {
  //     var descuen = 0;
  //     descuen = (valorActual * valorDescuento) / 100;
  //     valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
  //   } else {
  //     descuen = valorActual * 2 * 0.33;
  //     valorTotalDescuento = parseInt(valorActual) - parseInt(descuen);
  //   }
  //   console.log("valorDescuentoTotalP En metodo" + valorTotalDescuento);
  //   this.setState({ valorDescuentoTotalP: valorTotalDescuento });

  //   this.setState({ valorDescuentoTotalP: valorTotalDescuento });
  // }

  addToCart() {
    var product = this.state.product;

    product["Cantidad"] = this.state.quantity;

    AsyncStorage.getItem("shopingCart", (err, res) => {
      if (!res) {
        AsyncStorage.setItem("shopingCart", JSON.stringify([product]));
      } else {
        // this.valorTotalDescuento();
        //   product["PrecioDescuentoTotal"] = this.state.valorDescuentoTotalP;
        var items = JSON.parse(res);

        items.push(product);

        AsyncStorage.setItem("shopingCart", JSON.stringify(items));
      }

      ToastAndroid.show(
        "Producto adicionado al Carrito ",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    });
  }

  // Ejecutar 2 Funciones

  // combineFunctions() {
  //   this.addToCart();
  //   this.valorTotalDescuento();
  // }

  render() {
    // Informacion del objeto el cual se le dio el click en DetallesNegocio
    const { navigate } = this.props.navigation;
    const dataP = this.state.product;

    const imagenProducto = dataP["imagenProducto"];

    const descripcionProducto = dataP["descripcionProducto"];
    const nombreProducto = dataP["nombreProducto"];
    const precioUnidadProducto = dataP["precioUnidadProducto"];
    const nombreTienda = dataP["nombreTienda"];
    const cantidadProducto = dataP["cantidadProducto"];
    const codigoOferta = dataP["codigoOferta"];
    const descuento = dataP["descuento"];

    var productos = this.state.product;
    for (let i = 0; i < productos.length; i++) {
      const element = productos[i];
      console.log("ProductoAntes" + element);
    }

    for (let i = 0; i < productos.length; i++) {
      const element = productos[i];
      console.log("ProductoDespues" + element);
    }

    console.log(
      "El valorDescuentoTotalPEnRender" + this.state.valorDescuentoTotalP
    );

    // Construccion del NavHeader

    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon
            type="MaterialIcons"
            name="arrow-back"
            size={38}
            style={{ fontSize: 38 }}
          />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => navigate("Carrito")}>
          <Icon
            type="MaterialIcons"
            name="shopping-cart"
            size={38}
            style={{ fontSize: 38 }}
          />
        </Button>
      </Right>
    );

    return (
      <View style={styles.container}>
        <Navbar left={left} right={right} title="DetallesProducto" />

        <ScrollView>
          <View style={{ alignItems: "center", marginHorizontal: 30 }}>
            <Image style={styles.productImg} source={{ uri: imagenProducto }} />
            <Text style={styles.name}>{nombreProducto}</Text>
            <Text style={styles.price}>$ {precioUnidadProducto}</Text>
            <Text style={styles.description}>{descripcionProducto}</Text>
            <Text style={styles.descriptionLocal}>
              Local de Venta : {nombreTienda}
            </Text>

            <Text style={styles.descriptionLocal}>
              {codigoOferta == 1
                ? "Tipo Promoción : Bono"
                : codigoOferta == 2
                ? "Tipo Promoción : Descuento"
                : codigoOferta == 3
                ? "Tipo Promoción : Promo 2*1  Debes llevar 2 items y pagas 1"
                : codigoOferta == 4
                ? "Tipo Promoción : Promo 3*1"
                : "Producto no en Promoción - Revisar Promociones"}{" "}
            </Text>
            <Text style={styles.descriptionLocal}>
              {codigoOferta == 1
                ? "$ "
                : codigoOferta == 2
                ? "% "
                : codigoOferta == 3
                ? "% "
                : codigoOferta == 4
                ? "% "
                : ""}
              {descuento}
            </Text>
            <Text style={styles.descriptionLocal}>
              Cantidad Disponible : {cantidadProducto - this.state.quantity}
            </Text>
          </View>

          <View style={styles.countContainer}>
            <Text style={styles.descriptionLocal}>Cantidad Compra:</Text>

            <View style={styles.iconsContainer}>
              <Icon
                size={50}
                name="remove-circle"
                type="MaterialIcons"
                onPress={() =>
                  this.setState({
                    quantity:
                      this.state.quantity > 1 ? this.state.quantity - 1 : 1,
                  })
                }
              />

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 30,
                  paddingRight: 30,
                }}
              >
                <Text style={{ fontSize: 35, fontWeight: "bold" }}>
                  {this.state.quantity}
                </Text>
              </View>
              <Icon
                size={50}
                name="add-circle"
                type="MaterialIcons"
                onPress={() =>
                  this.setState({
                    quantity: this.state.quantity + 1,
                  })
                }
              />
            </View>
          </View>

          <View style={styles.separator} />
          <View style={styles.addToCarContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={this.addToCart.bind(this)}
            >
              <Text style={styles.shareButtonText}>
                Adicionar Producto al Carrito
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImg: {
    width: 260,
    height: 200,
    marginTop: 10,
  },
  name: {
    fontSize: 30,
    color: "#696969",
    fontWeight: "bold",
  },
  price: {
    marginTop: 10,
    fontSize: 38,
    color: "black",
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#696969",
  },
  descriptionLocal: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#696969",
  },
  descriptionCantidad: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#696969",
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: "#778899",
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    justifyContent: "center",
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  iconsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  separator: {
    height: 2,
    backgroundColor: "#eeeeee",

    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
    marginBottom: 10,
  },
});

//make this component available to the app
export default DetallesNegocioProducto;
