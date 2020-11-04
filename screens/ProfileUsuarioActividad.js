//import liraries
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  AsyncStorage,
} from "react-native";

//import AsyncStorage from "@react-native-community/async-storage";
//import ImagePicker from "react-native-image-picker";
import NavBar from "../components/NavbarHeader";
import { Left, Button, Icon, Container } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
//import { ImagePicker } from "expo";
// create a component
class ProfileUsuarioActividad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUri: null,
      userProfileData: [],
      idUser: "",
      UserEmail: "",
      name: "",
      lastName: "",
      Userdireccion: "",
      UserTelefono: "",
      valueToken: "",
      tokenB: "",
    };
  }

  componentWillMount() {
    const { postId, otherParam } = this.props.route.params;

    var objetoPuro = otherParam.dataUsuario[0];

    // Variables para el estado
    var id = objetoPuro.idUsuario;
    var name = objetoPuro.nombreUsuario;
    var correo = objetoPuro.correoUsuario;
    var lastName = objetoPuro.apellidoUsuario;
    var direccion = objetoPuro.direccionUsuario;
    var telefono = objetoPuro.telefonoUsuario;
    var token = otherParam.tokenLogueo;
    // console.log(otherParam);
    // console.log(objetoPuro);
    // console.log(id, name, lastName, correo, token);

    this.setState({
      userProfileData: objetoPuro,
      idUser: id,
      UserEmail: correo,
      name: name,
      lastName: lastName,
      Userdireccion: direccion,
      UserTelefono: telefono,
      tokenB: token,
    });
  }

  componentDidMount() {
    this._retrieveData2();
  }

  // Inicio Metodos del ImagePicker
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        imageUri: result.uri,
      });
    }

    let idUsuario = this.state.idUser;
    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    // formData.append("idUsuario", {
    //   string: JSON.stringify(idUsuario), //This is how it works :)
    //   type: "application/json",
    // });

    formData.append("photo", {
      uri: localUri,
      name: filename,
      type,
    });

    //  formData.append("idUsuario", this.state.idUsuario);
    //    formData.set("idUsuario", idUsuario);
    console.log(
      "formdata" +
        formData +
        "idUsuario" +
        idUsuario +
        "localUri" +
        localUri +
        " -- Filename ------ " +
        filename
    );
    return await fetch(
      "http://andresteccorp.club/TesisAndres/imagenUploadsUsuario_Mobile.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          //  "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          idUsuario: this.state.idUser,
          filename: filename,
        }),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log("res ---- " + res);
        if (res == idUsuario) {
          fetch(
            "http://andresteccorp.club/TesisAndres/imagenUploadsUsuario_Mobile.php",
            {
              method: "POST",
              body: formData,
              header: {
                "content-type": "multipart/form-data",
              },
            }
          );

          alert(" Cambio Imagen Satisfactorio \n" + "Loguearse de nuevo ");
          this.componentWillMount();
        } else {
          alert("Vamos Mal");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Fin Metodos del ImagePicker

  // Metodos del Profile User
  logOut() {
    this.setState({
      userProfileData: [],
      valueToken: "",
      tokenB: "",
    });

    alert("Saliste del Sistema.");
    this.props.navigation.navigate("Home");
  }

  // Start Session to buy products

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@storage_Key");
  //     if (value !== null) {
  //       this.setState({ valueToken: value });
  //       console.log("desde metodo" + value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  _retrieveData2() {
    try {
      const value = AsyncStorage.getItem("!@storage_Key@@!");
      //  console.log(" _retrieveData2" + value);
      if (value !== null) this.setState({ valueToken: value });

      //  console.log(" _retrieveData3" + this.state.valueToken);
    } catch (error) {
      // Error retrieving data }
    }
  }
  // _retrieveData2() {
  //   AsyncStorage.getItem("!@storage_Key@@!", (err, result) => {
  //     this.setState({ valueToken: JSON.parse(result) });
  //     console.log(" _retrieveData2" + result.valueToken);
  //   });
  // }

  // getDataSession() {
  //   var data = sessionStorage.getItem("!@storage_Key@@!");
  //   data = JSON.parse(data);
  //   console.log(data);
  // }

  // Pass Data to shopingCart with tokenB == true
  datosCarritoSession() {
    const { navigate } = this.props.navigation;
    navigate("Carrito", {
      itemId: 60,
      otherParam: {
        tokenSession: this.state.tokenB,
        idUsuario: this.state.idUser,
        nombreUsuario: this.state.name,
      },
    });
  }

  // Pass Data to FacturaUser
  passDataFact() {
    const { navigate } = this.props.navigation;
    navigate("FacturaUser", {
      itemId: 70,
      otherParam: {
        id: this.state.idUser,
        email: this.state.UserEmail,
        name: this.state.name,
        lastName: this.state.lastName,
      },
    });
  }

  //Pass Data to PedidoUser
  passDataPed() {
    this.props.navigation.navigate("PedidoUser", {
      itemId: 71,
      otherParam: {
        id: this.state.idUser,
        email: this.state.UserEmail,
        name: this.state.name,
        lastName: this.state.lastName,
      },
    });
  }

  render() {
    //  console.log("En el render" + this.setState.valueToken);
    //  console.log("El IdUser Render" + this.state.idUser);
    const { navigate } = this.props.navigation;
    const dataP = this.state.userProfileData;
    var imageUri = this.state.userProfileData.imagenUsuario;
    // let { imageUri } = this.state;
    var correoUsuario = this.state.userProfileData.correoUsuario;
    var direccionUsuario = this.state.userProfileData.direccionUsuario;
    var telefonoUsuario = this.state.userProfileData.telefonoUsuario;
    var nombreUsuario = this.state.userProfileData.nombreUsuario;
    var apellidoUsuario = this.state.userProfileData.apellidoUsuario;

    return (
      <Container style={{ backgroundColor: "#fdfdfd" }}>
        <NavBar title="Profile_Usuario" />
        <View>
          <Image
            style={styles.imagen}
            source={
              imageUri
                ? { uri: imageUri }
                : require("../images/fotoNotAvailable.jpg")
            }
          />
          <View>
            <Text style={styles.infoU1}> Correo : {correoUsuario}</Text>
            <Text style={styles.infoU2}> Direccion : {direccionUsuario}</Text>
            <Text style={styles.infoU2}> Telefono : {telefonoUsuario}</Text>
            <Text style={styles.infoU2}>
              Nombre : {nombreUsuario} {apellidoUsuario}
            </Text>
          </View>
          <View style={styles.bodyContent}>
            <FlatList
              data={this.state.userProfileData}
              renderItem={this.userInfo}
              keyExtractor={(item) => item.idUsuario}
            />
          </View>
          <View style={styles.infoPedido}>
            <Text
              style={{
                fontSize: 30,
                color: "#696969",
                fontWeight: "600",
              }}
            >
              Mis Opciones
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ justifyContent: "center" }}>
            <View style={styles.separator} />
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                /* 1. Navigate to the CheckO route with params */
                this.datosCarritoSession();
              }}
              color="#89C4F4"
            >
              <Text>Carrito Compra Productos</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                /* 1. Navigate to the FacturaUser route with params */
                this.passDataFact();
              }}
              color="#89C4F4"
            >
              <Text>Mis Facturas</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                /* 1. Navigate to the PedidoUser route with params */
                this.passDataPed();
              }}
              color="#89C4F4"
            >
              <Text>Mis Pedidos</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={this._pickImage}
              color="#89C4F4"
            >
              <Text>Modificar Imagen</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={() =>
                navigate("UpdateProfileUser", {
                  itemId: 79,
                  otherParam: {
                    idUser: this.state.idUser,
                    email: this.state.UserEmail,
                    name: this.state.name,
                    lastName: this.state.lastName,
                    direccion: this.state.Userdireccion,
                    telefono: this.state.UserTelefono,
                  },
                })
              }
              color="#89C4F4"
            >
              <Text>Modificar Datos Usuario</Text>
            </Button>
            <Button
              style={styles.buttonContainer}
              onPress={() => {
                this.logOut();
              }}
              color="#89C4F4"
            >
              <Text>Salir</Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

// define your styles

const styles = StyleSheet.create({
  imagen: {
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 1,
    alignItems: "center",
    width: 160,
    height: 160,
    borderRadius: 10,
    marginLeft: 100,
  },

  header: {
    backgroundColor: "#00BFFF",
    height: 100,
  },
  separator: {
    height: 2,

    backgroundColor: "#eeeeee",
    marginTop: 10,
    marginHorizontal: 30,
  },
  infoPedido: {
    paddingLeft: 15,
  },

  name: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  bodyContent: {
    alignItems: "center",
    padding: 6,
  },
  name1: {
    fontSize: 30,
    color: "#696969",
    fontWeight: "600",
  },
  infoU1: {
    fontSize: 20,
    color: "#00BFFF",
    marginTop: 4,
    marginLeft: 15,
  },
  infoU2: {
    fontSize: 20,

    marginLeft: 15,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "left",
    paddingLeft: 15,
  },
  buttonContainer: {
    marginTop: 10,
    height: 35,
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

//make this component available to the app
export default ProfileUsuarioActividad;
