import React from 'react';
import { StyleSheet, Button, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { AntDesign } from '@expo/vector-icons';
import CameraScreen from './CameraScreen';
import Login from './Login';
import DocumentListScreen from './DocumentListScreen';
import DocumentDetailsScreen from './DocumentDetailsScreen';
import RegisterScreen from './RegisterScreen';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Perfil from './Perfil';

//import { useNavigation } from '@react-navigation/native';
//import {getAuth} from 'firebase/auth';








const HomeScreen = () => {

  const route = useRoute();
 // const uid = "7777"
 const uid = route.params.uid;
 // console.log(uid)


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

  const CustomToolbar = ({ navigation, uid }) => {
    const handleAddDocument = () => {
      // Lógica para agregar un nuevo documento
      // Por ejemplo, puedes navegar a una pantalla de creación de documentos
      navigation.navigate('CameraScreen', { uid });
    };
  
    




    return (
      <TouchableOpacity onPress={handleAddDocument}>
        <Ionicons name="ios-camera-outline" size={25} color="#0D7AFF" style={styles.icon} />
        
      </TouchableOpacity>
    );
  };


  const HandleLeftButtonPress = ({ navigation, uid }) => {
    const handlePerfil = () => {
      navigation.navigate('Perfil', { uid });

    };

    return (
      <TouchableOpacity onPress={handlePerfil}>
        <MaterialCommunityIcons name="account-circle-outline" size={24} color="black"  style={styles.icon}/>
      </TouchableOpacity>
    );
    // Realiza aquí las acciones necesarias cuando se presione el botón izquierdo del encabezado
    // Por ejemplo, puedes abrir un menú lateral o realizar otra navegación específica.
  };
   
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}  options={({ navigation, route }) => ({
    title: 'Cardpy',
    headerRight: () => <CustomToolbar navigation={navigation} uid={route.params.userData} />,
    headerLeft: () =>  <HandleLeftButtonPress navigation={navigation} uid={route.params.userData}/>

  
  })} />
        <Stack.Screen name="CameraScreen" component={CameraScreen}  options={{ title: 'Nuevo Documento' }}/>
        <Stack.Screen name="DocumentListScreen" component={DocumentListScreen}  options={{ title: 'Mis Documentos'}}/>
        <Stack.Screen name="DocumentDetailsScreen" component={DocumentDetailsScreen}  options={{ title: 'Vista Previa' }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: '' }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Mi Perfil' }}/>
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


  
  icon: {
    marginRight: 10,
  },
});
