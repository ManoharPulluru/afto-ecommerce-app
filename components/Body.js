// components/Body.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "../configFiles/router";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import OrdersScreen from "./screens/OrdersScreen";
import SettingsScreen from "./screens/SettingsScreen";
import UserScreen from "./screens/UserScreen";
import { LoginPage } from "./modals/Login";

const Body = () => {
  const { currentRoute } = useRouter();

  const renderScreen = () => {
    switch (currentRoute) {
      case "home":
        return <HomeScreen />;
      case "cart":
        return <CartScreen />;
      case "orders":
        return <OrdersScreen />;
      case "settings":
        return <SettingsScreen />;
      case "user":
        return <UserScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

export default Body;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
