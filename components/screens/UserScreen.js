import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { useTheme } from "../../configFiles/theme";

const UserScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={[styles.header, { color: theme.primary }]}>User Profile</Text>

      {/* Avatar + Name */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100x100.png?text=User" }}
          style={styles.avatar}
        />
        <Text style={[styles.userName, { color: theme.text }]}>John Doe</Text>
        <Text style={[styles.userEmail, { color: theme.text }]}>johndoe@example.com</Text>
      </View>

      <Text style={[styles.subtitle, { color: theme.text }]}>
        Manage your account and profile information:
      </Text>

      <View style={styles.listContainer}>
        <Text style={[styles.listItem, { color: theme.text }]}>
          • Profile details
        </Text>
        <Text style={[styles.listItem, { color: theme.text }]}>
          • Account settings
        </Text>
        <Text style={[styles.listItem, { color: theme.text }]}>
          • Saved addresses
        </Text>
        <Text style={[styles.listItem, { color: theme.text }]}>
          • Payment methods
        </Text>
      </View>

      <View style={styles.emptyState}>
        <Text style={[styles.emptyText, { color: theme.text }]}>
          Profile features will appear here soon.
        </Text>
      </View>
    </ScrollView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 16, marginBottom: 16 },
  avatarContainer: { alignItems: "center", marginBottom: 24 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 8 },
  userName: { fontSize: 18, fontWeight: "600" },
  userEmail: { fontSize: 14 },
  listContainer: { marginLeft: 8 },
  listItem: { fontSize: 14, marginBottom: 4 },
  emptyState: { marginTop: 32, alignItems: "center" },
  emptyText: { fontSize: 14, fontStyle: "italic" },
});
