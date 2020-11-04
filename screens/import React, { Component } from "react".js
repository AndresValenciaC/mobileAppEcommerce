import React, { Component } from "react";
import { StyleSheet, TextInput, Alert, Text } from "react-native";
import { View, Left, Right, Icon, Item, Input, Button } from "native-base";
import NavBar from "../components/NavbarHeader";
import Container from "../components/Container";
export default class UpdateProfileUser extends Component {
  constructor(props) {
    super(props);

    //   this.state = {
    //   idUsuario:'',
    //   nombreUsuario: "",
    //   apellidoUsuario: "",
    //   correoUsuario: "",
    //   direccionUsuario: "",
    //   telefonoUsuario: "",
    //     passW: "",
    //   campoTabla:''
    // };

    this.state.state = {
      item: {
        idUsuario: "",
        nombreUsuario: "",
        apellidoUsuario: "",
        correoUsuario: "",
        direccionUsuario: "",
        telefonoUsuario: "",
        passW: "",
      },
    };
  }

  clearText = () => {
    this.setState({
      nombreUsuario: "",
      apellidoUsuario: "",
      correoUsuario: "",
      direccionUsuario: "",
      telefonoUsuario: "",
      passW: "",
    });
  };

  functionCombined() {
    //  this.UserRegistrationFunction();
    this.clearText();
    //  this.props.navigation.navigate("Login");
  }

  UserUpdateFunction = () => {
    const { UserName } = this.state;
    const { UserApellido } = this.state;
    const { UserEmail } = this.state;
    const { UserDireccion } = this.state;
    const { UserTelefono } = this.state;
    const { UserPassword } = this.state;
  };

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this.props.navigation.pop()}>
          <Icon name="arrow-back" size={38} style={{ fontSize: 38 }} />
        </Button>
      </Left>
    );
    return (
      <Container>
        <NavBar left={left} title="ModificarDatos" />
        <Text style={styles.title}>Modificacion Datos Usuario</Text>
        <Text style={styles.subtitle}>
          llenar el campo modificado correctamente
        </Text>
        <View style={styles.TextInputContainer}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="nombreUsuario"
              value={this.state.item.nombreUsuario}
              placeholder="Nombre"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="apellidoUsuario"
              value={this.state.item.apellidoUsuario}
              placeholder="Apellido"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="telefonoUsuario"
              value={this.state.item.telefonoUsuario}
              placeholder="Telefono"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="direccionUsuario"
              value={this.state.item.direccionUsuario}
              placeholder="Direccion"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="correoUsuario"
              value={this.state.item.correoUsuario}
              placeholder="Correo"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="passW"
              value={this.state.item.passW}
              placeholder="Contraseña"
              onChange={this.handleChange}
            />
          </form>

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
                Modificar
              </Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

// Styles

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
    marginTop: 10,
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
    marginTop: 30,
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
