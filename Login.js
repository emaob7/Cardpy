import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput,Text,TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import {getAuth} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


//desde aca
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import SignInScreen from "./screens/SignInScreen";





export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: "632865725104-n237v30hh3vhp3c0psfkt1ivl39g4hff.apps.googleusercontent.com",
    androidClientId: "632865725104-hm2tb0okcnvg73bmj8h6kt7v7tchu7v4.apps.googleusercontent.com",
  });




  const auth = getAuth()
  const navigation = useNavigation();







  WebBrowser.maybeCompleteAuthSession();

  async function autoLogin() {
    // Obtener datos del usuario guardados en AsyncStorage
   // try {
      const uid = await AsyncStorage.getItem('user');
      if (uid !== null) { 
      // console.log("User logged in memory!", userData);
        navigation.replace( "Home",{uid})
      } else {
       // console.error('Error al obtener datos del usuario de AsyncStorage:');
       setShowLoginForm(true);

       const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
         await AsyncStorage.setItem("user",(uid));
         
         navigation.replace( "Home",{uid})
        } else {
          console.log("user not authenticated");
        }
      });
      return () => unsub();

       
      }
 //   } catch (e) {
 //     console.error('Error al obtener datos del usuario de AsyncStorage:', e);
 //   }
  }
  

 


 useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

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

 
  return (
    <View style={styles.container}>
      {showLoginForm ? (
        <>
        
        <View style={styles.titlesContent}>
          <Image
           source={require('./assets/favicon1.png')} // Asegúrate de proporcionar la ruta correcta
           style={{ width: 200, height: 200, marginTop:-25, marginLeft: -20 }} // Establece el estilo de la imagen según tus necesidades
          
          />
        <Text style={styles.super}>Bienvenido a Cardpy</Text>
        <Text style={{ marginTop:5, marginLeft: -20 }}>👋 Hola! Nos alegra verte por aqui </Text>
        
      
        </View>
        <SignInScreen promptAsync={promptAsync} />
<View style={{ flexDirection: "row" }}>

<View style={{ borderTopWidth: 1, borderColor: "#424242", width: "31%", marginTop:17 }} />
        <Text 
         style={{
          alignItems:"center",
          alignContent:"center",
          justifyContent:"center",
          width: "30%",
          padding: 10,
          color: "#424242"
        }}>O ingresa con</Text>
        <View style={{ borderTopWidth: 1, borderColor: "#424242", width: "31%", marginTop:17 }} />


</View>
       
        
          <Text style={styles.text}>Correo:</Text>
          <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Ingrese su correo"
          />
          </View>
          
          <Text style={styles.text}>Contraseña:</Text>
          <View style={styles.inputContainer}>
          <TextInput
          style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Ingrese su contraseña"
            secureTextEntry
          />
          </View>
          

<View style={styles.buttonContent}>
       <TouchableOpacity style={styles.button} onPress={() => signIn(email, password)}>
    <Text style={styles.textButton} >INICIAR</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonC} onPress={() => navigation.navigate("RegisterScreen")}>
    <Text>¿Aún no tienes una cuenta?</Text><Text style={styles.textButtonC} >Crea una cuenta</Text>
    </TouchableOpacity>


    

       </View>

       
       
        </>
      ):(null)}
    </View>
  );



 
}

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
    marginTop:-28,
    fontWeight: 'bold',
    marginLeft: -20
    
  },
  subtitulo: {
    fontSize: 24,
      
  },
  titlesContent:{
    alignItems:"center",
    marginBottom:38,
    marginTop:5,
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
