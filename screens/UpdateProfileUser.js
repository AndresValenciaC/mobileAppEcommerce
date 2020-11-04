import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Form, Alert } from "react-native";
import { Left, Button, Icon } from "native-base";
import NavBar from "../components/NavbarHeader";
import Container from "../components/Container";

export default class UpdateProfileUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idUsuario: "",
      TextInput_User_Nombre: "",
      TextInput_User_Apellido: "",
      TextInput_User_Correo: "",
      TextInput_User_Direccion: "",
      TextInput_User_Telefono: "",
      // TextInput_User_PassW: "",
    };
  }

  componentWillMount() {
    const { postId, otherParam } = this.props.route.params;
    var id = otherParam.idUser;
    var nombre = otherParam.name;
    var apellido = otherParam.lastName;
    var correo = otherParam.email;
    var direccion = otherParam.direccion;
    var telefono = otherParam.telefono;

    this.setState({
      idUsuario: id,
      TextInput_User_Nombre: nombre,
      TextInput_User_Apellido: apellido,
      TextInput_User_Correo: correo,
      TextInput_User_Direccion: direccion,
      TextInput_User_Telefono: telefono,
      // TextInput_User_PassW: "",
    });
  }

  UpdateUserRecord = () => {
    const { navigate } = this.props.navigation;
    fetch("http://andresteccorp.club/TesisAndres/userUpdateData_Mobile.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.idUsuario,
        user_nombre: this.state.TextInput_User_Nombre,
        user_apellido: this.state.TextInput_User_Apellido,
        user_correo: this.state.TextInput_User_Correo,
        user_direccion: this.state.TextInput_User_Direccion,
        user_telefono: this.state.TextInput_User_Telefono,
        // user_passW: this.state.TextInput_User_PassW,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server updating records.
        console.log(responseJson);
        Alert.alert("Exitoso \n" + "tu información personal actualizada");
        this.props.navigation.navigate("ProfileUsuario");
      })
      .catch((error) => {
        console.error(error);
      });
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
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.subtitle}>Actualizar el campo correctamente</Text>
        <View style={styles.TextInputContainer}>
          <TextInput
            name="TextInput_User_Nombre"
            placeholder="Nombre"
            onChangeText={(TextInput_Value) =>
              this.setState({ TextInput_User_Nombre: TextInput_Value })
            }
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.TextInput_User_Nombre}
          />
          <TextInput
            name="TextInput_User_Apellido"
            placeholder="Apellido"
            onChangeText={(TextInput_Value) =>
              this.setState({ TextInput_User_Apellido: TextInput_Value })
            }
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.TextInput_User_Apellido}
          />
          <TextInput
            name="TextInput_User_Correo"
            placeholder="Correo"
            onChangeText={(TextInput_Value) =>
              this.setState({ TextInput_User_Correo: TextInput_Value })
            }
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.TextInput_User_Correo}
          />
          <TextInput
            name="TextInput_User_Direccion"
            placeholder="Direccion"
            onChangeText={(TextInput_Value) =>
              this.setState({ TextInput_User_Direccion: TextInput_Value })
            }
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.TextInput_User_Direccion}
          />
          <TextInput
            name="TextInput_User_Telefono"
            placeholder="Telefono"
            onChangeText={(TextInput_Value) =>
              this.setState({ TextInput_User_Telefono: TextInput_Value })
            }
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            value={this.state.TextInput_User_Telefono}
          />

          <View style={styles.ButtonUpdate}>
            <Button rounded light onPress={() => this.UpdateUserRecord()}>
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
  ButtonUpdate: {
    justifyContent: "center",
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
