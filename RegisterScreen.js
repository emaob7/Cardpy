import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
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
        .doc()
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
      signIn(email,password);
    } 
catch (error) {
      console.error("Failed to create user account:", error);
    }
  };
  

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth,email, password);
      console.log("User logged in!");
      navigation.navigate("Home")
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };


  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Escribe correo"
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Escribe una contraseña"
        secureTextEntry
      />
       <Text>Nombre:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Escriba Su Nombre"
      />
      <Text>Apellido:</Text>
      <TextInput
        value={last}
        onChangeText={setLast}
        placeholder="Escriba Su Apellido"
      />
      <Button title="Registrarse" onPress={() => signUp(email, password,name, last)} />
    </View>
  );
}
