// src/navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import { Home, Users, Settings } from 'lucide-react-native'; // Lucide icons

export type BottomTabParamList = {
  Home: undefined;
  Employees: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Determine icon based on route
          let IconComponent = Home;
          if (route.name === 'Home') {
            IconComponent = Home;
          } else if (route.name === 'Employees') {
            IconComponent = Users;
          } else if (route.name === 'Settings') {
            IconComponent = Settings;
          }

          return <IconComponent color={color} size={size} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          position: 'absolute',
          marginLeft: 20,
          bottom: 20,
          alignSelf: 'center',  // centers it horizontally
          width: '90%',         // adjust this to 70% or 300 if you prefer fixed width
          elevation: 0,
          backgroundColor: '#fff',
          borderRadius: 50,
          height: 70,
          marginBottom: 10,
          
          paddingBottom: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* Add Employees and Settings later */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;