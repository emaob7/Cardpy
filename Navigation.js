import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';
import Login from './Login';
import DocumentListScreen from './DocumentListScreen';
import DocumentDetailsScreen from './DocumentDetailsScreen';



const Stack = createNativeStackNavigator();

export default function Navigation() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="DocumentListScreen" component={DocumentListScreen} />
        <Stack.Screen name="DocumentDetailsScreen" component={DocumentDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



