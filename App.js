import React from 'react';
import { StyleSheet, View,Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CameraScreen from './CameraScreen';
import Login from './Login';
import DocumentListScreen from './DocumentListScreen';
import DocumentDetailsScreen from './DocumentDetailsScreen';
import RegisterScreen from './RegisterScreen';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
//import {getAuth} from 'firebase/auth';








const HomeScreen = ({navigation}) => {

  const route = useRoute();
  const uid = route.params.userData;


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CameraScreen', {uid})}
      >
        <MaterialCommunityIcons name="credit-card-scan-outline" size={24} color="#0D7AFF" />
        <Text style={styles.textN}>Nuevo</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
        onPress={() => navigation.navigate('DocumentListScreen', {uid})}
      ><MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="black" />
      <Text style={styles.textD}>Mis Documentos</Text>
      </TouchableOpacity>
      
    </View>
  );
};


const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen}  options={{ title: 'Nuevo Documento' }}/>
        <Stack.Screen name="DocumentListScreen" component={DocumentListScreen}  options={{ title: 'Mis Documentos' }}/>
        <Stack.Screen name="DocumentDetailsScreen" component={DocumentDetailsScreen}  options={{ title: 'Vista Previa' }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Registrarse' }}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //backgroundColor: 'gray'
  },
  textN: {
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
    fontSize:28,
    color:"#0D7AFF"
  },
  textD: {
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
    fontSize:28,
    color:"#0D0D0D",
  },
});
