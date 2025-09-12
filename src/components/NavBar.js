import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../assets/Icon';

export default function NavBar() {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.tab}>
        <Icon name="home" height={24} width={24} color="#4CAF50" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Icon name="task" height={24} width={24} color="#4CAF50" />
        <Text style={styles.label}>Problems</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Icon name="school" height={24} width={24} color="#4CAF50" />
        <Text style={styles.label}>College</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Icon name="chat" height={24} width={28} color="#4CAF50" />
        <Text style={styles.label}>Chats</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Icon name="cast" height={24} width={24} color="#4CAF50" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Icon name="menu" height={24} width={24} color="#4CAF50" />
        <Text style={styles.label}>Settings</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#333',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  tab: {
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});
