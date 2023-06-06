import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, RefreshControl} from 'react-native';
import firebase from "./firebase";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { useRoute } from '@react-navigation/native';



const DocumentListScreen = (props) => {
  const  {uid}  = props;
 // const { uid } = route.params;
//  console.log("prop",uid)
  const [documents, setDocuments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const navigation = useNavigation();

  
const obtenerDatos = async () => {

  
  try {
    // Verificar si los datos JSON ya están almacenados en AsyncStorage
    const datosJsonGuardados = await AsyncStorage.getItem('@datosJson');
    
    if (datosJsonGuardados) {
      // Si los datos existen en AsyncStorage, utilizarlos directamente
      const datosJson = JSON.parse(datosJsonGuardados);
      // Hacer algo con los datosJson
      setDocuments(datosJson);
      console.log('AsyncStorage');
    } else {
      // Si los datos no existen en AsyncStorage, obtenerlos de Firebase Firestore
      // Hacer la llamada a Firebase Firestore aquí y almacenar los datos en AsyncStorage
      // Una vez obtenidos los datos de Firebase, puedes guardarlos en AsyncStorage de la siguiente manera:
      // const datosJsonString = JSON.stringify(datosFirebase);
      // await AsyncStorage.setItem('datosJson', datosJsonString);
      //setDocuments("");
      const fetchDocuments = async () => {
        const response = await firebase.db.collection(uid).get();
        const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDocuments(data);
//almacenar en el storage los datos obtenidos
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('@datosJson', jsonValue)
       console.log("firebase");
        
      };
      fetchDocuments();
    }
  } catch (error) {
    // Manejar el error aquí
    console.error('Error al obtener los datos JSON:', error);
  }




};

useEffect(() => {
 // if (documents.length === 0) {
  obtenerDatos();
//}
}, []);


const onRefresh = () => {
  // Lógica para realizar la actualización
  // Por ejemplo, puedes hacer una llamada a una API para obtener nuevos datos
  setRefreshing(true);
  obtenerDatos();
  // Simulación de una llamada asincrónica
  setTimeout(() => {
    setRefreshing(false);
  }, 1500);
};





  const handleDocumentPress = (documents) => {
    navigation.navigate('DocumentDetailsScreen', { documents });
  };


  const deleteDocumen = (id,foto1,foto2) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro/a de que deseas eliminar este elemento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress:  () => {

          let imageRef1 = firebase.storage.refFromURL(foto1).delete();
    
          let imageRef2 = firebase.storage.refFromURL(foto2).delete();

          const documentsRef = firebase.db.collection(uid);
          documentsRef.doc(id).delete();
   
          const jsonActualizado = (documents.filter((item) => item.id !== id));
          setDocuments(jsonActualizado);
        
          

           const storeData = async (jsonActualizado) => {
            try {
              const jsonValue = JSON.stringify(jsonActualizado)
              await AsyncStorage.setItem('@datosJson', jsonValue)
             // console.log(jsonValue)
            } catch (e) {
              console.log(e)
            }
          }

          storeData(jsonActualizado); 

            
          },
        },
      ],
      { cancelable: false }
    );
  
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.nuevo}  onPress={() => navigation.navigate('CameraScreen', {uid})}>
      <MaterialCommunityIcons name="credit-card-scan-outline" size={17} color="#0D7AFF" />
      <Text style={styles.textNuevo}>Agregar nuevo</Text>
      </TouchableOpacity>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor="yellow"/>
        }
        renderItem={({ item }) => (

          <View style={styles.document}>
            <TouchableOpacity style={styles.textContent}   onPress={() => handleDocumentPress(item)}>
           
            <Text style={styles.textN}>{item.nombre}</Text>
            <Text style={styles.textC}>CIN: {item.cin}</Text>
            
            

          </TouchableOpacity>
          <TouchableOpacity 
              style={styles.button}
              onPress={() => {
                deleteDocumen(item.id,item.foto1,item.foto2);
              }}
            >
              <MaterialIcons name="delete-outline" size={27} color="#0D7AFF" />
          </TouchableOpacity>
         

          </View>
          
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  document: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    width: '99%',
    marginTop:3
  },
  nuevo: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#0D7AFF',
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: 'white',
    width: '95%',
    marginTop:7,
    
  },
  textNuevo: {
    paddingVertical: 7,
    fontSize:17,
   color:"#0D7AFF",
   marginLeft:5
   
  // alignContent: 'center',
  //  backgroundColor: 'gray',

  },
  textN: {
    paddingVertical: 3,
    width: '100%',
    marginRight: 5,
    fontSize:19,
   color:"#0D0D0D",
  //  backgroundColor: 'gray',

  },
  textC: {
    paddingVertical: 3,
    width: '56%',
    color:"#9B9CA0"
   // paddingLeft:10
  },
  textContent: {
    flexDirection: 'column',
    paddingLeft: 20,
    width: '80%',
  //  backgroundColor: 'blue',
    
    
  },
  button: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    maxWidth: '18%',
    margin: 0,
   // backgroundColor: 'green',

  },

});

export default DocumentListScreen;
