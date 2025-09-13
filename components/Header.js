// Header.tsx
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./ReUse/Icon";
import { useTheme } from "../configFiles/theme";

export default function Header() {
  const { theme } = useTheme(); // you can still grab toggleTheme & isDark if needed later

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme.border },
      ]}
    >
      <Image
        source={{
          uri: "https://etlstoreqa.blob.core.windows.net/afto-delivery-details/images/b217fa14-10df-4762-9dda-021a26c290f1_logo.png",
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.rightContainer}>
        {/* Cart Button */}
        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: theme.primary }]}
        >
          <Icon name="cart" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64, // same as h-16
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12, // px-3
    borderBottomWidth: 1,
  },
  logo: {
    height: 64,
    width: 64,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartButton: {
    height: 36, // h-9
    aspectRatio: 1, // keeps it square
    borderRadius: 9999, // fully rounded
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8, // mr-2
  },
});
