import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/auth/login/LoginScreen';
import RegisterScreen from './src/screens/auth/register/RegisterScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import ConnectInstagramScreen from './src/screens/instagram/ConnectInstagramScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ConnectInstagram" component={ConnectInstagramScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
