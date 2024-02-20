import React  from 'react';
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import { EstadoProvider } from './EstadoContext';
import CameraScreen from './CameraScreen';
import TabNav from './TabNav';
import Login from './Login';
import DocumentListScreen from './DocumentListScreen';
import DocumentDetailsScreen from './DocumentDetailsScreen';
import RegisterScreen from './RegisterScreen';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import Perfil from './Perfil';
import FormHerramientas from './screens/FormHerramientas';

//import { useNavigation } from '@react-navigation/native';
//import {getAuth} from 'firebase/auth';








const HomeScreen = () => {

  const route = useRoute();
 // const uid = "7777"
 const uid = route.params.uid;

  //console.log(uid)


  //<DocumentListScreen uid={uid}/>

  return (

    
    <>
    {/*<View style={styles.container}>*/}
    <StatusBar style="auto" /> 


    <TabNav uid={uid}/>



   

     

   </>
  );
};



const Stack = createNativeStackNavigator();

export default function App() {


 



  const CustomToolbar = ({ navigation, uid}) => {
    const handleAddDocument = () => {
      // Lógica para agregar un nuevo documento
      // Por ejemplo, puedes navegar a una pantalla de creación de documentos
      navigation.navigate('CameraScreen', { uid });
      
    };

    return (
      <TouchableOpacity onPress={handleAddDocument} >
        <Ionicons name="add-circle-sharp" size={28} color="#0D7AFF" />
       
      </TouchableOpacity>
    );
  };


  const HandleLeftButtonPress = ({ navigation, uid }) => {
    const handlePerfil = () => {
      navigation.navigate('Perfil', { uid });

    };

    return (
      <TouchableOpacity onPress={handlePerfil} style={styles.perfil}>
        <Text>{'\u{1F335}'}</Text>
       {/* <MaterialCommunityIcons 5 name="account-circle-outline" size={24} color="black"  style={styles.icon}/> */}
      </TouchableOpacity>
    );
    // Realiza aquí las acciones necesarias cuando se presione el botón izquierdo del encabezado
    // Por ejemplo, puedes abrir un menú lateral o realizar otra navegación específica.
  };
   
  return (
    <EstadoProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}  options={({ navigation, route }) => ({
    title: 'Cardpy',
    headerRight: () => <CustomToolbar navigation={navigation} uid={route.params.uid} />,
    headerLeft: () =>  <HandleLeftButtonPress navigation={navigation} uid={route.params.uid}/>

  
  })} />
        <Stack.Screen name="CameraScreen" component={CameraScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="DocumentListScreen" component={DocumentListScreen}  options={{ title: 'Mis Documentos'}}/>
        <Stack.Screen name="DocumentDetailsScreen" component={DocumentDetailsScreen}  options={{ title: 'Vista Previa' }}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: '' }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ title: 'Mi Perfil' }}/>
        <Stack.Screen name="TabNav" component={TabNav}/>
        <Stack.Screen name="FormHerramientas" component={FormHerramientas} options={{ title: 'Herramientas y Habilidades' }}/>
      </Stack.Navigator>

    </NavigationContainer>
    </EstadoProvider>
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
  perfil: {
   alignItems: 'center',
     backgroundColor: "#EAF1FB",
     padding: 5,
     borderRadius:20,
     height:30
   },
   add: {
   justifyContent: 'center',
   alignContent:"center",
      backgroundColor: "#EAF1FB",
      padding: 3,
      borderRadius:50,
      height:30
    },
});
