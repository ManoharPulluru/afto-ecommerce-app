import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent, NativeSyntheticEvent, TargetedEvent } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import svgPaths from './src/assets/svg.json';
import Home from './src/components/RouteComponents/Home';

// Define type for svgPaths
interface SvgPaths {
  [key: string]: string;
  'home-outline': string;
  home: string;
  'school-outline': string;
  school: string;
  'task-outline': string;
  task: string;
  'cast-outline': string;
  cast: string;
  chat: string;
  'chat-outline': string;
  menu: string;
}

// Type the imported svgPaths
const typedSvgPaths: SvgPaths = svgPaths;

// Haptic feedback options
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// Screen Components
const HomeScreen = () => (
  <View style={styles.screenContainer}>
    <Home/>
  </View>
);

const SchoolScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>School Screen</Text>
  </View>
);

const TaskScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Task Screen</Text>
  </View>
);

const CastScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Cast Screen</Text>
  </View>
);

const ChatScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Chat Screen</Text>
  </View>
);

const MenuScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Menu Screen</Text>
  </View>
);

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const iconName = route.name.toLowerCase();
            const path = typedSvgPaths[iconName];
            return (
              <Svg width="24" height="24" viewBox="0 0 8 8">
                <Path d={path} fill={focused ? '#007AFF' : '#333'} />
              </Svg>
            );
          },
          tabBarButton: (props) => {
            const { onPress, disabled, onBlur, ...restProps } = props; // Destructure to separate onPress, disabled, and onBlur
            return (
              <TouchableOpacity
                {...restProps}
                disabled={disabled ?? undefined} // Convert null to undefined
                delayLongPress={restProps.delayLongPress ?? undefined} // Retain previous fix
                onBlur={onBlur ?? undefined} // Convert null to undefined
                onPress={(e: GestureResponderEvent) => {
                  onPress?.(e); // Trigger navigation
                  ReactNativeHapticFeedback.trigger('impactLight', hapticOptions); // Trigger haptic feedback
                }}
              />
            );
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#333',
          tabBarStyle: styles.tabBar,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="School" component={SchoolScreen} />
        <Tab.Screen name="Task" component={TaskScreen} />
        <Tab.Screen name="Cast" component={CastScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Menu" component={MenuScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  screenText: {
    fontSize: 20,
    color: '#333',
  },
  tabBar: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
});