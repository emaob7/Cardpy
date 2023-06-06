import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { AntDesign } from '@expo/vector-icons';
import CameraScreen from './CameraScreen';
import Login from './Login';
import DocumentListScreen from './DocumentListScreen';
import DocumentDetailsScreen from './DocumentDetailsScreen';
import RegisterScreen from './RegisterScreen';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
//import { useNavigation } from '@react-navigation/native';
//import {getAuth} from 'firebase/auth';








const HomeScreen = () => {

  const route = useRoute();
  const uid = route.params.userData;
  //console.log(uid)


  return (

    <>
    {/*<View style={styles.container}>*/}
      <StatusBar style="auto" /> 


    <DocumentListScreen uid={uid}/>   

 
 {/*     <View style={styles.containerAll}>
      <View style={styles.portada}>

      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CameraScreen', {uid})}
      >
        <MaterialCommunityIcons name="credit-card-scan-outline" size={35} color="#0D7AFF" />
        <Text style={styles.textN}>Nuevo</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
        onPress={() => navigation.navigate('DocumentListScreen', {uid})}
      ><AntDesign name="pdffile1" size={35} color="black" />
      <Text style={styles.textD}>Mis Documentos</Text>
      </TouchableOpacity>
      </View>
     
     </View>
      
      
      */}
      
   {/* </View>*/}
    </>
  );
};



const Stack = createNativeStackNavigator();
export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cardpy' }} />
        <Stack.Screen name="CameraScreen" component={CameraScreen}  options={{ title: 'Nuevo Documento' }}/>
        <Stack.Screen name="DocumentListScreen" component={DocumentListScreen}  options={{ title: 'Mis Documentos'}}/>
        <Stack.Screen name="DocumentDetailsScreen" component={DocumentDetailsScreen}  options={{ title: 'Vista Previa' }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Registrarse' }}/>
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // flexDirection: 'column',
   //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#f6f7f9"
   // justifyContent: 'space-evenly',
  },
  containerAll:{
    marginTop: 120,
    width:"92%"
  },
  buttonContainer:{
    marginTop: 20,
    width:"99%",
    flexDirection: 'row',
  },
  portada: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: '#0D7AFF',
    width: '99%',
    height:160,
    marginTop:3,
    borderRadius: 10,
    paddingVertical:15,
    paddingHorizontal:20
    //backgroundColor: 'gray'
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '46%',
    marginTop:3,
    marginRight:28,
    borderRadius: 10,
    paddingVertical:20,
    paddingHorizontal:10,
    //backgroundColor: 'gray'
  },
  textN: {
    paddingVertical: 10,
 //   marginLeft: 10,
    justifyContent: 'center',
    fontSize:17,
    color:"#0D7AFF"
  },
  textD: {
    paddingVertical: 10,
   // marginLeft: 10,
    justifyContent: 'center',
    fontSize:17,
    color:"#0D0D0D",
  },
});
