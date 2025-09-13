// App.tsx
import React, { useState } from "react";
import { View, StatusBar, Platform, StyleSheet, Modal } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import { ThemeProvider, useTheme } from "./configFiles/theme";
import { RouterProvider } from "./configFiles/router";
import LoginScreens from "./components/modals/Login";

function MainApp() {
  const { theme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <View  style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight / 1.5 : 0,
        },
      ]}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor={theme.background}
      />
      
      <View style={styles.header}>
        <Header />
      </View>
      
      <View style={styles.body}>
        <Body />
      </View>
      
      <View style={styles.footer}>
        <Footer onUserPress={() => setShowLoginModal(true)} />
      </View>

      {/* Login Modal */}
      <Modal
        visible={showLoginModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLoginModal(false)}
      >
        <LoginScreens onClose={() => setShowLoginModal(false)} />
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <MainApp />
      </RouterProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: 64, // same as h-16
    width: "100%",
  },
  body: {
    flex: 1,
    width: "100%",
  },
  footer: {
    height: 64, // same as h-16
    width: "100%",
  },
});