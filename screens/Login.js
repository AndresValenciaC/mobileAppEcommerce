//import liraries
// React native and others libraries imports
import React, { Component } from "react";

import {
  Container,
  View,
  Right,
  Button,
  Icon,
  Item,
  Input,
  Text,
  Col,
  Grid,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Alert,
  TextInput,
  AccessToken,
  localStorage,
} from "react-native";
import Navbar from "../components/NavbarHeader";
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";
// create a component
export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      UserEmail: "",
      UserPassword: "",
      idUser: "",
      nombre: "",
      apellido: "",
      direccion: "",
      imagenUsuario: "",
      telefonoUsuario: "",
      dataUsuario: "",
      hasError: false,
      logueo: false,
      errorText: "",
    };
  }

  // Metodos

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        "!@storage_Key@@!",
        "8ba790f3-5acd-4a08-bc6a-97a36c124f29@@##-vrt-ebe-uo7w7643321*"
      );
    } catch (e) {
      console.log("Something went wrong", error);
    }
  };

  login() {
    this.setState({
      hasError: true,
      errorText: "Invalido Nombre Usuario - Correo o Password !",
    });
  }

  clearText = () => {
    this.setState({
      UserEmail: "",
      UserPassword: "",
    });
  };

  UserLoginFunction = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;
    const idPerfil = 3;

    console.log("desde funcion" + UserEmail + UserPassword);

    if (
      this.state.UserEmail === "" ||
      (this.state.UserPassword === "" && idPerfil == 3)
    ) {
      Alert.alert("Porfavor No Dejar Vacios \n" + "Los Campos Del Formato");
    } else {
      let response = fetch(
        "http://andresteccorp.club/TesisAndres/User_Login.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: UserEmail,
            password: UserPassword,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("responseJson" + responseJson);
          if (responseJson == "CamposNoCoinciden") {
            alert("CamposNoCoinciden\n" + "Intentar de Nuevo");
          } else {
            this.setState({
              // dataUsuario: responseJson,
              dataUsuario: responseJson,
              idUser: responseJson.map((item) => item.idUsuario),
              nombre: responseJson.map((item) => item.nombreUsuario),
              apellido: responseJson.map((item) => item.apellidoUsuario),
              direccion: responseJson.map((item) => item.direccionUsuario),
              imagenUsuario: responseJson.map((item) => item.imagenUsuario),
              telefonoUsuario: responseJson.map((item) => item.telefonoUsuario),
              logueo: true,
            });
            console.log("Respuesta del Json Login" + responseJson);
            Alert.alert(
              "Datos Correctos \n" +
                "Bienvenido " +
                this.state.nombre +
                this.state.apellido
            );
            this.datosProfile();
          }
        })

        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Funcion de pasar datos al Profile User
  datosProfile() {
    const { navigate } = this.props.navigation;
    navigate("ProfileUsuario", {
      itemId: 70,
      otherParam: {
        dataUsuario: this.state.dataUsuario,
        tokenLogueo: this.state.logueo,
      },
    });
  }

  functionCombined() {
    // this.validacionSession();
    this.UserLoginFunction();
    this.clearText();
  }

  goToPassReset = () => this.props.navigation.navigate("passR");

  render() {
    const { navigate } = this.props.navigation;

    // var right = (
    //   <Right style={{ flex: 1 }}>
    //     <Button onPress={() => navigate("Cart")}>
    //       <Icon size={38} style={{ fontSize: 38 }} name="ios-cart" />
    //     </Button>
    //   </Right>
    // );

    //<Navbar right={right} title="Login" />
    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar title="LoginUsuario" />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 50,
            paddingRight: 50,
            marginTop: 50,
            marginBottom: 50,
          }}
        >
          <View style={{ marginBottom: 25, width: "100%" }}>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                textAlign: "left",
                width: "100%",
                color: "#2c3e50",
              }}
            >
              Bienvenido
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                width: "100%",
                color: "#687373",
              }}
            >
              Para entrar a la plataforma
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                width: "100%",
                color: "#687373",
              }}
            >
              debes de estar registrado
            </Text>
          </View>

          <View style={{ marginBottom: 25, marginTop: 15, width: "100%" }}>
            <Item style={{ marginBottom: 25, marginTop: 25, hight: "30%" }}>
              <Ionicons active name="ios-mail" style={{ color: "#687373" }} />
              <TextInput
                placeholder="Correo"
                onChangeText={(text) => this.setState({ UserEmail: text })}
                placeholderTextColor="#687373"
                value={this.state.UserEmail}
              />
            </Item>
            <Item>
              <Ionicons active name="ios-lock" style={{ color: "#687373" }} />
              <TextInput
                placeholder="Contraseña"
                onChangeText={(text) => this.setState({ UserPassword: text })}
                placeholderTextColor="#687373"
                secureTextEntry={true}
                value={this.state.UserPassword}
              />
            </Item>
          </View>

          <View style={{ marginTop: 15, width: "100%" }}>
            <Button
              onPress={this.goToPassReset}
              style={{ backgroundColor: "transparent" }}
            >
              <Text style={{ color: "#039BE5" }}>Forgot Password ?</Text>
            </Button>
          </View>

          {this.state.hasError ? (
            <Text
              style={{
                color: "#c0392b",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {this.state.errorText}
            </Text>
          ) : null}

          <Grid style={{ marginTop: 20, marginBottom: 10 }}>
            <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
              <Button
                onPress={() => this.functionCombined()}
                style={{ backgroundColor: "#00BFFF", marginTop: 20 }}
              >
                <Text style={{ color: "#fdfdfd" }}>Login</Text>
              </Button>
            </Col>

            <Col style={{ paddingLeft: 10, paddingRight: 5 }}>
              <Button
                onPress={() => navigate("RegistroUser")}
                style={{ backgroundColor: "#00BFFF", marginTop: 20 }}
              >
                <Text style={{ color: "#fdfdfd" }}>Registro</Text>
              </Button>
            </Col>
          </Grid>
        </View>
      </Container>
    );
  }
}

// Estilos
const styles = StyleSheet.create({
  buttonsV: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
