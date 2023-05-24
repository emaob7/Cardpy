import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import firebase from "./firebase";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const DocumentListScreen = ({ route }) => {
  const { uid } = route.params;
  const [documents, setDocuments] = useState([]);
  
  const navigation = useNavigation();

  /*
  useEffect(() => {

    const fetchDocuments = async () => {
      const response = await firebase.db.collection(uid).get();
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocuments(data);
      //console.log(data)
    };

    fetchDocuments();
  }, []);

*/


useEffect(() => {
  const obtenerDatos = async () => {
    try {
      // Verificar si los datos JSON ya están almacenados en AsyncStorage
      const datosJsonGuardados = await AsyncStorage.getItem('@datosJson');
      
      if (datosJsonGuardados) {
        // Si los datos existen en AsyncStorage, utilizarlos directamente
        const datosJson = JSON.parse(datosJsonGuardados);
        // Hacer algo con los datosJson
        setDocuments(datosJson);
        console.log('Datos JSON obtenidos de AsyncStorage:', datosJson);
      } else {
        // Si los datos no existen en AsyncStorage, obtenerlos de Firebase Firestore
        // Hacer la llamada a Firebase Firestore aquí y almacenar los datos en AsyncStorage
        // Una vez obtenidos los datos de Firebase, puedes guardarlos en AsyncStorage de la siguiente manera:
        // const datosJsonString = JSON.stringify(datosFirebase);
        // await AsyncStorage.setItem('datosJson', datosJsonString);
        const fetchDocuments = async () => {
          const response = await firebase.db.collection(uid).get();
          const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setDocuments(data);
//almacenar en el storage los datos obtenidos
          const jsonValue = JSON.stringify(data)
          await AsyncStorage.setItem('@datosJson', jsonValue)
         // console.log(data)
          
        };
        fetchDocuments();
      }
    } catch (error) {
      // Manejar el error aquí
      console.error('Error al obtener los datos JSON:', error);
    }
  };

  obtenerDatos();
}, []);






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
          onPress: () => {
            

          let imageRef1 = firebase.storage.refFromURL(foto1).delete();
    
          let imageRef2 = firebase.storage.refFromURL(foto2).delete();

          const documentsRef = firebase.db.collection(uid);
          documentsRef.doc(id).delete();
   
           setDocuments(documents.filter((item) => item.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.document}>
            <TouchableOpacity style={styles.textContent}   onPress={() => handleDocumentPress(item)}>
           
            <Text style={styles.textN}>{item.nombre}</Text>
            <Text style={styles.textC}>CIN: {item.edad}</Text>
            
            

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
