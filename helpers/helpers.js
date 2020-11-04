import { Alert, AsyncStorage, Text, Image } from "react-native";

const helpers = {
  removeAll: function (self) {
    self.setState({ cartItems: [] });
    AsyncStorage.setItem("shopingCart", JSON.stringify([]));
  },
};

export default helpers;
