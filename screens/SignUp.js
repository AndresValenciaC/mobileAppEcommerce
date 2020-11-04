import React, { Component } from "react";

import { StyleSheet, TextInput, Alert, Text } from "react-native";
import { View, Left, Right, Icon, Item, Input, Button } from "native-base";
import NavBar from "../components/NavbarHeader";
import Container from "../components/Container";
export default class SingUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserName: "",
      UserApellido: "",
      UserEmail: "",
      UserDireccion: "",
      UserTelefono: "",
      UserPassword: "",
    };
  }

  clearText = () => {
    this.setState({
      UserName: "",
      UserApellido: "",
      UserEmail: "",
      UserDireccion: "",
      UserTelefono: "",
      UserPassword: "",
    });
  };

  functionCombined() {
    this.UserRegistrationFunction();
    this.clearText();
    this.props.navigation.navigate("Login");
  }

  UserRegistrationFunction = () => {
    const { UserName } = this.state;
    const { UserApellido } = this.state;
    const { UserEmail } = this.state;
    const { UserDireccion } = this.state;
    const { UserTelefono } = this.state;
    const { UserPassword } = this.state;

    if (
      this.state.UserName === "" ||
      this.state.UserApellido === "" ||
      this.state.UserEmail === "" ||
      this.state.UserDireccion === "" ||
      this.state.UserTelefono === "" ||
      this.state.UserPassword === ""
    ) {
      Alert.alert(
        "Porfavor llenar Correctamente \n" + "Cada Uno de los Campos"
      );
    } else {
      fetch(`http://andresteccorp.club/TesisAndres/userRegister.php`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: UserName,
          lastname: UserApellido,
          email: UserEmail,
          addres: UserDireccion,
          phone: UserTelefono,
          password: UserPassword,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
          Alert.alert(
            responseJson + " " + "\nPorfavor Logearse para entrar al Sistema"
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon name="arrow-back" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );
    return (
      <Container>
        <NavBar left={left} title="RegistroUsuario" />
        <Text style={styles.title}>Registro de Usuario</Text>
        <Text style={styles.subtitle}>
          Porfavor llenar todos los campos correctamente
        </Text>
        <View style={styles.TextInputContainer}>
          <TextInput
            placeholder="Nombre"
            onChangeText={(UserName) => this.setState({ UserName })}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.UserName}
          />

          <TextInput
            placeholder="Apellido"
            onChangeText={(UserApellido) => this.setState({ UserApellido })}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.UserApellido}
          />

          <TextInput
            placeholder="Telefono"
            onChangeText={(UserTelefono) => this.setState({ UserTelefono })}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.UserTelefono}
          />

          <TextInput
            placeholder="Dirección"
            onChangeText={(UserDireccion) => this.setState({ UserDireccion })}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.UserDireccion}
          />

          <TextInput
            placeholder="Correo"
            onChangeText={(UserEmail) => this.setState({ UserEmail })}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.UserEmail}
          />

          <TextInput
            placeholder="Contraseña"
            onChangeText={(UserPassword) => this.setState({ UserPassword })}
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            secureTextEntry={true}
            value={this.state.UserPassword}
          />
          <View style={styles.ButtonRegistro}>
            <Button rounded light onPress={() => this.functionCombined()}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  color: "#00BFFF",
                }}
              >
                Registrarse
              </Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  TextInputStyleClass: {
    textAlign: "center",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#2c3e50",
    borderRadius: 5,
  },

  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    color: "#2c3e50",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    color: "#2c3e50",
    marginTop: 10,
  },
  TextInputContainer: {
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  ButtonRegistro: {
    justifyContent: "center",
    marginTop: 30,

    paddingLeft: 15,
    paddingRight: 15,
  },
});
