import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import firebase from "./firebase";
//import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Perfil () {

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
         await AsyncStorage.removeItem('@datosJsonCv');
         console.log('Usuario eliminado de AsyncStorage');
         navigation.navigate("Login")
        
  };
  
  return (
    <View style={styles.container}>
      <Text>Nuestros Robots estan trabajando incanzablemente para mejorar esta pantalla con tus datos y mas opciones&#x2699;&#x1F916;</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.textButton}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAF1FB',
    paddingTop: 50,
   // paddingLeft: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 22,
    borderColor:'#E0E0E0',
    borderWidth: 1,
    marginTop:4,
    height:40,
    width: "93%"
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  text:{
    fontWeight: 'bold',
    color: "#424242"
  },
  textButtonC:{
    fontWeight: 'bold',
    color: "#0D7AFF",
    fontSize: 15,

  },
  textButton:{
    fontWeight: 'bold',
    color: "#fff"
  },
   super: {
    fontSize: 27,
    marginBottom:5,
    fontWeight: 'bold',
    marginLeft: -20
    
  },
  subtitulo: {
    fontSize: 24,
      
  },
  titlesContent:{
    alignItems:"center",
    marginBottom:38,
    marginTop:38,
  },
  button: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#0D7AFF",
    paddingHorizontal: 17,
    marginTop:20,
    borderRadius:20,
    height:40,
    width:150,
    marginLeft: -20
  },
  buttonC: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:30,
    height:40,
    width:250,
    marginLeft: -20
  },
  buttonContent:{
    alignItems:"center",
    marginBottom:38,
    
  },


});