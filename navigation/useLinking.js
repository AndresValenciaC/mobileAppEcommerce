import { useLinking } from "@react-navigation/native";
import { Linking } from "expo";
import DetallesNegocioProducto from "../screens/DetallesNegocioProducto";
import Home from "../screens/DetallesNegocioProducto";
export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl("/")],
    config: {
      Root: {
        path: "root",
        screens: {
          Home: "Home",

          DetallesNP: "DetallesNegocioProducto",
          Login: "login",

          Carrito: "Carrito",
        },
      },
    },
  });
}
