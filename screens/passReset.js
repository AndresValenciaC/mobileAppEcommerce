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

export default class passReset extends Component {
  static navigationOptions = {
    title: "Login",
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      passO: "",
      passN: "",
      passC: "",
      correoUsuario: "",
      idUser: "",
      hasError: false,
      logueo: false,
      errorText: "",
    };
  }

  // Metodos
  clearText = () => {
    this.setState({
      passO: "",
      passN: "",
      passC: "",
      UserEmail: "",
      passWordT: "",
      idUser: "",
      logueo: false,
    });
  };

  UserResetFunction = () => {
    const { passO } = this.state;
    const { passN } = this.state;
    const { passC } = this.state;
    const { UserEmail } = this.state;
    const idPerfil = 3;

    console.log("desde funcion" + passO + passN + passC + UserEmail);

    if (
      this.state.passO === "" ||
      this.state.passN === "" ||
      this.state.passC === "" ||
      (this.state.UserEmail === "" && idPerfil == 3)
    ) {
      Alert.alert("Porfavor No Dejar Vacios \n" + "Los Campos Del Formato");
    } else if (this.state.passN !== this.state.passC) {
      Alert.alert("Passwords \n" + "No Coinciden");
    } else {
      let response = fetch(
        "http://andresteccorp.club/ecom_val/resetPassUserMobile.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passO: passO,
            passN: passN,
            passC: passC,
            UserEmail: UserEmail,
            idPerfil: idPerfil,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("responseJson" + responseJson);
          if (responseJson == "CamposNoCoinciden") {
            alert("Datos Incorrectos \n" + "PassWord  No Cambiado ");
          } else {
            console.log("Respuesta del Json Login" + responseJson);
            Alert.alert(
              "Datos Correctos \n" +
                "PassWord Cambiado \n" +
                "Porfavor Loguearse"
            );
            this.clearText();
            this.props.navigation.navigate("Home");
          }
        })

        .catch((error) => {
          console.error(error);
        });
    }
  };

  //  if (password !== password2) {
  //           setAlert('password does not matched', 'danger');
  //         } else {
  //           reset({ password, token });
  //       }
  //       };

  // public function savePassword(){
  // 	$sqlQuery = "
  // 		SELECT email, authtoken
  // 		FROM ".$this->memberTable."
  // 		WHERE authtoken='".$_POST['authtoken']."'";
  // 	$result = mysqli_query($this->dbConnect, $sqlQuery);
  // 	$numRows = mysqli_num_rows($result);
  // 	if($numRows) {
  // 		while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
  // 			$sqlQuery = "
  // 				UPDATE ".$this->memberTable."
  // 				SET password='".md5($_POST['newPassword'])."'
  // 				WHERE email='".$row['email']."' AND authtoken='".$row['authtoken']."'";
  // 			mysqli_query($this->dbConnect, $sqlQuery);
  // 		}
  // 		return 1;
  // 	} else {
  // 		return 0;
  // 	}
  // }

  render() {
    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <Navbar title="Reset Contraseña" />

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
              Password Reset
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
            <Item style={{ marginBottom: 25, marginTop: 25, hight: "30%" }}>
              <Ionicons active name="ios-lock" style={{ color: "#687373" }} />

              <TextInput
                placeholder="PassWord Original"
                onChangeText={(text) => this.setState({ passO: text })}
                placeholderTextColor="#687373"
                secureTextEntry={true}
                value={this.state.passO}
              />
            </Item>
            <Item style={{ marginBottom: 25, marginTop: 25, hight: "30%" }}>
              <Ionicons active name="ios-lock" style={{ color: "#687373" }} />
              <TextInput
                placeholder="PassWord Nuevo"
                onChangeText={(text) => this.setState({ passN: text })}
                placeholderTextColor="#687373"
                secureTextEntry={true}
                value={this.state.passN}
              />
            </Item>
            <Item style={{ marginBottom: 25, marginTop: 25, hight: "30%" }}>
              <Ionicons active name="ios-lock" style={{ color: "#687373" }} />
              <TextInput
                placeholder="Password Confirmacion"
                onChangeText={(text) => this.setState({ passC: text })}
                placeholderTextColor="#687373"
                secureTextEntry={true}
                value={this.state.passC}
              />
            </Item>
          </View>

          <View style={{ marginTop: 15, width: "100%" }}>
            <Button
              onPress={this.UserResetFunction}
              style={{ backgroundColor: "transparent" }}
            >
              <Text style={{ color: "#039BE5" }}>Reset Password </Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}
