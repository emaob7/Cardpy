import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {getAuth} from 'firebase/auth';
import firebase from "./firebase";
import { useNavigation } from '@react-navigation/native';




export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [last, setLast] = useState('');

  const auth = getAuth();
  const navigation = useNavigation();
 

 

  
  const signUp = async (email, password,name, last) => {
    try {
      await createUserWithEmailAndPassword(auth,email, password)
      const user = auth.currentUser;
      const uid = user.uid;
        firebase.db
        .collection("Users")
        .doc(uid)
        .set(
          {
            id: uid,
            email: email,
            password: password,
            name:name,
            last:last,
        },{merge: true}
        );
      console.log("User account created!");
      Alert.alert('Tu cuenta ha sido creada');
      signIn(email,password);
      navigation.navigate("Home",{uid});
    } 
catch (error) {
      Alert.alert('Error al Registrarse','Revise su conexión o que el correo no corresponda a otra cuenta que ya exista en Cardpy');
      console.error("Failed to create user account:", error);
    }
  };
  

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth,email, password);
      console.log("User logged in!");
      
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.titlesContent}>
      <Text style={styles.super}>Crea tu cuenta de Cardpy</Text>
      <Text style={styles.subtitulo}>Introduce tus datos</Text>
      </View>
      
      <Text style={styles.text}>Nombre:</Text>
       <View style={styles.inputContainer}>
      <TextInput
       style={styles.input}
       placeholderTextColor="#9E9E9E"
        value={name}
        onChangeText={setName}
        placeholder="Escriba su nombre"
      />
      </View>
      <Text style={styles.text}>Apellido:</Text>
      <View style={styles.inputContainer}>
      <TextInput
       style={styles.input}
       placeholderTextColor="#9E9E9E"
        value={last}
        onChangeText={setLast}
        placeholder="Escriba su apellido"
      />
      </View>
      <Text style={styles.text}>Correo:</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#9E9E9E"
        value={email}
        onChangeText={setEmail} 
        placeholder="Escribe correo"
      />
      </View>
    
      <Text style={styles.text}>Contraseña:</Text>
      <View style={styles.inputContainer}>
      <TextInput
       style={styles.input}
       placeholderTextColor="#9E9E9E"
        value={password}
        onChangeText={setPassword}
        placeholder="Escribe una contraseña"
        secureTextEntry
      />
      </View>
       <View style={styles.buttonContent}>
       <TouchableOpacity style={styles.button} onPress={() => signUp(email, password,name, last)}>
    <Text style={styles.textButton} >CREAR CUENTA</Text>
    </TouchableOpacity>

       </View>
     


      
    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 50,
    paddingLeft: 20
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
  textButton:{
    fontWeight: 'bold',
    color: "#fff"
  },
   super: {
    fontSize: 27,
    marginBottom:5,
    fontWeight: 'bold',
    
  },
  subtitulo: {
    fontSize: 24,
      
  },
  titlesContent:{
    alignItems:"center",
    marginBottom:38,
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
  buttonContent:{
    alignItems:"center",
    marginBottom:38,
    
  },



},


)