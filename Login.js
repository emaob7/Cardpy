import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import {getAuth} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth()
  const navigation = useNavigation();




  async function autoLogin() {
    // Obtener datos del usuario guardados en AsyncStorage
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) { 
      //  console.log("User logged in memory!", userData);
        navigation.replace( "Home",{userData})
        //navigation.navigate("Home",{userData})
      } 
    } catch (e) {
      console.error('Error al obtener datos del usuario de AsyncStorage:', e);
      return (
        <View>
          <Text>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          <Text>Password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
          <Button title="Entrar" onPress={() => signIn(email, password)} />
          <Button title="Crear una cuenta"  onPress={()=> navigation.navigate("RegisterScreen")} />
        </View>
      );
    }
  }
  
  useEffect(() => {
    autoLogin();
  }, []);
 

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth,email, password);
      const user = auth.currentUser;
      const uid = user.uid;
      await AsyncStorage.setItem('user', uid);
      navigation.navigate("Home",{uid})
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  

 
  

 
}
