import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import Comercios from "../screens/Comercios";
import Login from "../screens/Login";
import Carrito from "../screens/ShopingCart";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",

          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Comercios"
        component={Comercios}
        options={{
          title: "Comercios",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-business" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-log-in" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Carrito"
        component={Carrito}
        options={{
          title: "Carrito",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-cart" />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Comercios":
      return "Comercios";
    case "Login":
      return "Login";
    // case "Carrito":
    //   return "Carrito";
  }
}
