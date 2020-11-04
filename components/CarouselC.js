// This component its only for  Img of Stores
import React, { Component } from "react";
import Carousel from "react-native-banner-carousel";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from "react-native";
//import { negocio } from '../Api_homeData/Api_homeData';

const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 250;

export default class CarouselC extends Component {
  static navigationOptions = {
    header: null,
    title: "CarouselC"
  };

  constructor(props) {
    super(props);
    this.state = { dataSource: [] };
  }

  componentDidMount() {
    const url = "http://andresteccorp.club/TesisAndres/comercios.php";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          //dataSource: responseJson.book_array
          // dataSource: dataN
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _renderPage(item) {
    return (
      <View key={item.idComercio}>
        <TouchableOpacity
          onPress={() => {
            alert("Comercio : " + item.nombreTienda);
          }}
        >
          <Image
            style={{ width: BannerWidth, height: BannerHeight }}
            source={{ uri: item.imagenComercio }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    data = this.state.dataSource;
    return (
      <View style={styles.container}>
        <Carousel
          autoplay
          autoplayTimeout={20000}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {data.map(image => this._renderPage(image))}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});
