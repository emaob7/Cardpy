import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from "./firebase";
//import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Perfil = () => {

  const navigation = useNavigation();
 // const auth = getAuth();



const handleLogout = async() => {
   //const userData = await AsyncStorage.getItem('user');
   //console.log("User logged in memory!", userData);

    
       await firebase.auth.signOut().then(() => {
            console.log("se cerro sesion");
            
         }); 
    
         await AsyncStorage.removeItem('user');
         await AsyncStorage.removeItem('@datosJson');
         console.log('Usuario eliminado de AsyncStorage');
         navigation.navigate("Login")
        
  };
  
  return (
    <View>
      <Text>Tu contenido de la pantalla principal aquí</Text>
      <TouchableOpacity onPress={handleLogout}>
      <Text>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Perfil;
