import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';

import AppHeader from '../components/header'; // your custom header component
import { Home, Users, Settings } from 'lucide-react-native';
import Employees from '../screens/Employees';

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
        header: () => {
          // Map route names to header titles
          const titleMap: Record<string, string> = {
            Home: 'Dashboard',
            Employees: 'Employees',
            Settings: 'Settings',
          };
          return <AppHeader title={titleMap[route.name] || 'App'} />;
        },
        tabBarIcon: ({ color, size }) => {
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
          alignSelf: 'center',
          width: '90%',
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* Uncomment these when ready */}
      <Tab.Screen name="Employees" component={Employees} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;