import React, { useState, useEffect, useContext } from 'react';
import firebase from "./firebase";
import { EstadoContext } from './EstadoContext';
import { useSnackbar } from './useSnackbar'; // Importa tu hook personalizado
import { Snackbar, Provider as PaperProvider } from 'react-native-paper';
import { FlatList, StyleSheet, Text, TouchableOpacity, View,Platform, Alert, RefreshControl, TextInput,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import ShareInstructions from './screens/ShareInstructions';
import EnviarCom from './EnviarCom';




//npx expo install expo@next --fix



const DocumentListScreen = (props) => {

  const  {uid}  = props;
  //console.log(uid)
 // const {refre} = props;
 // const { uid } = route.params;
//  console.log("prop",uid)
  const [documents, setDocuments] = useState([]);
  const { visible, message, showSnackbar, hideSnackbar } = useSnackbar();
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [progress, setProgress] = useState(null);
  const { refre, setRefre } = useContext(EstadoContext);
  
  const navigation = useNavigation();

  

  

  
const obtenerDatos = async () => {
 // await AsyncStorage.removeItem('@datosJsonCv');

  
  try {
    // Verificar si los datos JSON ya están almacenados en AsyncStorage
    const datosJsonGuardados = await AsyncStorage.getItem('@datosJson');
    
    if (datosJsonGuardados) {
      // Si los datos existen en AsyncStorage, utilizarlos directamente
      const datosJson = JSON.parse(datosJsonGuardados);
      setDocuments(datosJson);
      /*buscar cv
      const documentoCV = datosJson.find(item => item.id === "cv");
        const jsonValuecv = JSON.stringify(documentoCV)
        await AsyncStorage.setItem('@datosJsonCv', jsonValuecv)
      
      */

      
      
      
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
       // console.log(jsonValue);
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
  setRefre(false);
  setRefreshing(true);
  obtenerDatos();
  // Simulación de una llamada asincrónica
  setTimeout(() => {
    setRefreshing(false);
  }, 1500);

  showSnackbar('Datos actualizados ⚡️');
  
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
          showSnackbar('Documento eliminado!');

            
          },
        },
      ],
      { cancelable: false }
    );
  
  };


 const handleSearch = searchTerm => {
  const filtered = documents.filter(item => {
    return (
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cin.includes(searchTerm)
    );
  });
  setFilteredData(filtered);
};
  
const documentosFiltrados = documents.filter(item => item.foto1);



  return (
    <View style={styles.container}>



{/*  <TouchableOpacity style={styles.nuevo}  onPress={() => navigation.navigate('CameraScreen', {uid})}>
      <Ionicons name="add" size={20} color="#0D7AFF" />
      <Text style={styles.textNuevo}>Agregar nuevo</Text>
      </TouchableOpacity>
       */}

<View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingTop:65,
        paddingBottom:10,
        backgroundColor: '#F3F3F6',
        width: '100%', // O ajusta el ancho según tus necesidades
      }}
    >
      {/*
       <TouchableOpacity onPress={() => navigation.navigate('Perfil', {uid})} style={styles.perfil}>
        <Text>{'\u{1F335}'}</Text>
        <MaterialCommunityIcons 5 name="account-circle-outline" size={24} color="black"  style={styles.icon}/>
      </TouchableOpacity>
    
      <Text style={{ fontSize: 18, flex: 1, textAlign: 'center' }}>
        Cardpy
      </Text>
      */}
      <Text style={styles.super}>Cedulas</Text>
     
      <TouchableOpacity onPress={() => navigation.navigate('CameraScreen', {uid})} >
        <Ionicons name="add-circle-sharp" size={28} color="#1863FF" />
       
      </TouchableOpacity>
    </View>
   
 
       
<View style={{
         width: '100%',
        backgroundColor: '#F3F3F6',
      }}>
<View style={styles.inputContainer}>
<Ionicons name="search" size={20} color="#CCCCCC" style={styles.searchIcon} />
  <TextInput
    style={styles.input}
    value={searchTerm}
    onChangeText={text => {
    setSearchTerm(text);
    handleSearch(text);
  }}
    placeholder="Buscar"
    onSubmitEditing={handleSearch}
    placeholderTextColor="#CCCCCC"
  />
</View>
  </View>       

{progress ? (

<ActivityIndicator size="small" color="#007AFF" style={styles.load} />
) : null}

{searchTerm ? (

<FlatList
style={styles.flatlist}
    data={filteredData}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={styles.document}>
       <Ionicons name="card-outline" color="#546e7a" size={28} style={{  marginTop:8, marginLeft:17, marginRight:-7 }}/>
        <TouchableOpacity style={styles.textContent}   onPress={() => handleDocumentPress(item)}>
           
           <Text style={styles.textN}>{item.nombre}</Text>
           <Text style={styles.textC}>CIN: {item.cin}</Text>
           
         </TouchableOpacity>
         <View style={styles.iconContainer}>
         <TouchableOpacity
        style={styles.buttonC}
        onPress={() => {
          deleteDocumen(item.id, item.foto1, item.foto2);
        }}
      >
        <MaterialIcons name="delete-outline" size={22} color="#5A5E61" />
      </TouchableOpacity>
      <EnviarCom
      setProgress={setProgress}
      item={item}
      />
      
    </View> 
        
      </View>
    )}
  />

  ) : (

    <>
  
     {refre ? ( <TouchableOpacity  
                  onPress={() => onRefresh()}
                  style={styles.actualizar}
                >
                  <Ionicons name="arrow-up-outline" size={18} color="#FFFFFF"/>
                      <Text  style={styles.textAc}>Actualizar</Text>
                </TouchableOpacity> ) : null}
                <ShareInstructions 
          icon="share-apple"
          text="Solo aparecerán anuncios antes de compartir un archivo, esto es para que la app siga siendo gratuita" 
        />
      <FlatList
      style={styles.flatlist}
        data={documentosFiltrados}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        renderItem={({ item }) => (

          <View style={styles.document}>
            <Ionicons name="card-outline" color="#000000" size={20} style={{  marginTop:3, marginLeft:2, marginRight:-22 }}/>
           
            <TouchableOpacity style={styles.textContent}   onPress={() => handleDocumentPress(item)}>
            
            <Text style={styles.textN}>{item.nombre}</Text>
            <Text style={styles.textC}>CIN: {item.cin}</Text>
            
            

          </TouchableOpacity>
          <View style={styles.iconContainer}>
          <TouchableOpacity
        style={styles.buttonC}
        onPress={() => {
          deleteDocumen(item.id, item.foto1, item.foto2);
        }}
      >
        <MaterialIcons name="delete-outline" size={22} color="#5A5E61" />
      </TouchableOpacity>
      <EnviarCom
      setProgress={setProgress}
      item={item}
      />
     
    </View>
         

          </View>
          
        )}
      />
      </>
      )}

<View style={styles.snackbarContainer}>
          <Snackbar
            visible={visible}
            onDismiss={hideSnackbar}
            duration={3000} // Duración del Snackbar (3 segundos)
            style={styles.snackbar}
           
          >
            {message}
          </Snackbar>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#F0F3F5",
  },
  flatlist:{
marginTop:10,
//borderTopWidth: 1,
//borderTopColor: '#ccc',
//paddingTop:9,

  },
  snackbarContainer: {
    position: 'absolute',
    top: 160, // Posición desde la parte superior
    left: '50%',
    transform: [{ translateX: -150 }], // Ajusta según el ancho del Snackbar
    width: 300, // Ajusta el ancho según sea necesario
    alignItems: 'center',
    paddingHorizontal:52
  },
  snackbar: {
    width: '100%', // Hace que el Snackbar ocupe todo el ancho del contenedor
    backgroundColor: '#3498DB',
    borderRadius:30
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centrar horizontalmente
    alignItems: 'center', // Centrar verticalmente
    marginLeft:-15,
  },
  buttonC: {
    width: 40, // Ancho del círculo
    height: 40, // Alto del círculo
    borderRadius: 20, // Mitad del ancho y alto para hacer el círculo
    backgroundColor: "#F3F3F6", // Color gris claro
    justifyContent: 'center', // Centrar contenido verticalmente
    alignItems: 'center', // Centrar contenido horizontalmente
    marginHorizontal: 5, // Espacio entre los botones
    
  }, 

  document: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    marginLeft: 9,
    borderRadius: 10,
   // borderColor:"#FAFAFA",
   // borderWidth:1,
  //  backgroundColor: "#F3F3F6",
    justifyContent: 'space-evenly',
    backgroundColor: "#FFFFFF",
    //#D3E3FD #F2F6FC
    width: '95%',
    marginTop:3,
   // paddingRight:5,
   // shadowColor: '#000000',
    //shadowOffset: { width: 0, height: 1 },
   // shadowOpacity: 0.10,
    //shadowRadius: 2.84,
    // Shadow property for Android
   // elevation: 1,
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
    backgroundColor: '#FFFFFF',
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
    fontSize:15,
   color:"#0D0D0D",
   fontWeight: 'bold',
  //  backgroundColor: 'gray',

  },
  textC: {
    paddingVertical: 3,
    width: '56%',
    color:"#5A5E61",
    //9B9CA0
    fontSize:13,
   // paddingLeft:10
  },
  textContent: {
    flexDirection: 'column',
    paddingLeft: 20,
    width: '68%',
  //  backgroundColor: 'blue',
    
    
  },
  button: {
    padding: 15,
    justifyContent: 'center',
    maxWidth: '22%',
    margin: 0,
 // backgroundColor: 'white',
    borderRadius:50
    //20

  },
  buttonE: {
    paddingHorizontal: 17,
    justifyContent: 'center',
    maxWidth: '22%',
 //   marginRight: 5,
 // backgroundColor: 'white',
    borderRadius:50
    //18

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 70,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginLeft:20,
    height:40,
    width: "90%"
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
  searchIcon: {
    marginRight: 1, 
  },
  super: {
    fontSize: 30,
   // alignContent:"flex-start",
   // marginStart:-200,
   // marginTop:18,
    fontWeight: 'bold',
    marginLeft:0
  },
  load:{
    marginTop:25
  },
  actualizar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#0D7AFF",
    paddingHorizontal: 17,
    marginTop:20,
    borderRadius:20,
    height:40,
    width:150,
    elevation: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
    }),
    //marginLeft: -20,
  },
  textAc:{
    fontSize:15,
    color:"#FFFFFF",
    fontWeight: 'bold',
  },
  perfil: {
    alignItems: 'center',
      backgroundColor: "#EAF1FB",
      padding: 5,
      borderRadius:20,
      height:30
    },
});

export default DocumentListScreen;
