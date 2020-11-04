import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

/** Navigation Between Screens */
import HomeScreen from "./screens/HomeScreen";
import Registro from "./screens/SignUp";
import ProfileUsuario from "./screens/ProfileUsuarioActividad";
import DetallesNP from "./screens/DetallesNegocioProducto";
import Comercios from "./screens/Comercios";
import DetallesNegocio from "./screens/DetallesNegocio";
import Carrito from "./screens/ShopingCart";
import Checkout from "./screens/Checkout";
import FacturaUser from "./screens/FacturaUser";
import PedidoUser from "./screens/PedidoUser";
import UpdateProfileUser from "./screens/UpdateProfileUser";
import passR from "./screens/passReset";

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="RegistroUser" component={Registro} />
            <Stack.Screen name="ProfileUsuario" component={ProfileUsuario} />
            <Stack.Screen
              name="UpdateProfileUser"
              component={UpdateProfileUser}
            />
            <Stack.Screen name="DetallesNP" component={DetallesNP} />
            <Stack.Screen name="Comercios" component={Comercios} />
            <Stack.Screen name="DetallesNegocio" component={DetallesNegocio} />
            <Stack.Screen name="Carrito" component={Carrito} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="FacturaUser" component={FacturaUser} />
            <Stack.Screen name="PedidoUser" component={PedidoUser} />
            <Stack.Screen name="passR" component={passR} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
