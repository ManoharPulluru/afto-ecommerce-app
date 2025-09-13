// components/Footer.js
import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import Icon from "./ReUse/Icon";
import { useTheme } from "../configFiles/theme";
import { useRouter } from "../configFiles/router";

const { width: screenWidth } = Dimensions.get("window");

const Footer = ({ onUserPress }) => {
  const { theme, mode } = useTheme();
  const { currentRoute, setRoute } = useRouter();
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Routes in consistent order (excluding 'user' since it will show modal)
  const routes = ["home", "cart", "orders", "settings", "user"];
  
  // Calculate widths
  const iconWidth = screenWidth / routes.length;
  const indicatorWidth = iconWidth * 0.6;
  const indicatorOffset = (iconWidth - indicatorWidth) / 2;

  const handleNavigation = (route) => {
    if (route === "user") {
      // Show login modal instead of changing route
      onUserPress();
    } else {
      // Normal navigation for other routes
      setRoute(route);
    }
  };

  const getIconColor = (route) => {
    return currentRoute !== route ? theme.primary : theme.icon;
  };

  const getIconSize = (route) => {
    return currentRoute === route ? 24 : 22;
  };

  // Animate the indicator when route changes
  useEffect(() => {
    const routeIndex = routes.indexOf(currentRoute);
    const targetPosition = routeIndex * iconWidth + indicatorOffset;
    
    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  }, [currentRoute, iconWidth, indicatorOffset]);

  return (
    <View
      style={[
        styles.container,
        {
          borderTopWidth: mode === "light" ? 1 : 0,
          borderTopColor: theme.border,
          backgroundColor: theme.secondary,
        },
      ]}
    >
      {/* Main Footer Container */}
      <View style={styles.iconRow}>
        {routes.map((route) => {
          const iconNames = {
            home: "home",
            cart: "cart",
            orders: "orders",
            settings: "settings",
            user: "user",
          };

          return (
            <TouchableOpacity
              key={route}
              onPress={() => handleNavigation(route)}
              style={styles.iconButton}
            >
              <View style={styles.iconWrapper}>
                <Icon
                  name={iconNames[route]}
                  size={getIconSize(route)}
                  color={getIconColor(route)}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Animated Indicator - Only show for non-user routes */}
      {currentRoute !== "user" && (
        <Animated.View
          style={[
            styles.indicator,
            {
              left: slideAnim,
              width: indicatorWidth,
              backgroundColor: theme.primary,
            },
          ]}
        />
      )}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  iconRow: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
  },
  indicator: {
    position: "absolute",
    bottom: 4, // bottom-1 in Tailwind (approx 4px)
    height: 4,
    borderRadius: 9999,
  },
});