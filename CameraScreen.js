import React, { useState, useContext } from 'react';
import { EstadoContext } from './EstadoContext';
import { StyleSheet,View, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import firebase from "./firebase";
import {v4 as uuidv4} from "uuid";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


 

export default function CameraScreen({ route }) {

  const [cameraRef, setCameraRef] = useState(null);
  const [picture1, setPicture1] = useState(null);
  const [picture2, setPicture2] = useState(null);
  const [fotoUrl1, setFotoUrl1] = useState(null);
  const [fotoUrl2, setFotoUrl2] = useState(null);
  const [nombre, setNombre] = useState("");
  const [cin, setCin] = useState("");
  const [progress, setProgress] = useState(null);
  const { setRefre } = useContext(EstadoContext);

  const { uid } = route.params;
  //console.log(uid)
  const html = `
  <html>
  <head>
<title>Dos licencias de conducir</title>
<style>
.image-container {
  display: flex;
  justify-content: space-between;
}

.image-wrapper {
  position: relative;
  width: 100%;
  left: 10%;
}
  .imagen {
    border-radius: 10px;
    max-width: 50px;
    transform: rotate(-90deg);
  }

  .image-wrapper img {
    max-width: 52%;
    max-height: 52%;
    border-radius: 10px;
    object-fit: cover;
  }

</style>
</head>
    <body>
      <p style="color: red;">Hello. Bonjour. Hola.</p>
      <div class="image-container">
      <div class="image-wrapper">
        <img class="imagen" src=${fotoUrl1}>
      </div>
      <div class="image-wrapper">
        <img class="imagen" src=${fotoUrl2}>
        
      </div>
    </div>
    </body>
  </html>
`;



let generatePdf = async () => {
  setProgress(true);
  const file = await printToFileAsync({
    html: html,
    base64: false
  });
setProgress(false);
  await shareAsync(file.uri);
};
 // console.log(uid);

  //sacar foto
const takePicture = async () => {
  if (cameraRef) {
    const photo = await cameraRef.takePictureAsync({
      quality: 0.10,
      width: 371,
      height: 595
    });



//comprimir 
const image = await ImageManipulator.manipulateAsync(
  photo.uri,
  // [{ crop: { originX: 185, originY: 297, width: 351, height: 550 } }],
      [{ resize: { width: 371 } }], // Redimensionar la imagen a un ancho máximo de 800 píxeles
      { compress: 0.10 } // Ajustar la calidad al 2%// Ajustar la calidad al 2%
    );


    if (!picture1) {
     
      setPicture1(image.uri);
      
    } else if (!picture2) {
      setPicture2(image.uri);
      //console.log(image.uri)
    }
  }


};


const savePictures = async () => {
  
 //const db = firebase.firestore();
setProgress(true);
const nombreArchivo = uuidv4();
const extension = picture1.split('.').pop();
const file = await fetch(picture1);
const blob = await file.blob();

const file2 = await fetch(picture2);
const blob2 = await file2.blob();

const storageRef = firebase.storage.ref();
    const archivoPath = storageRef.child(`pictures/picture1-${nombreArchivo}.${extension}`);
    await archivoPath.put(blob, { contentType: `image/${extension}` });;
    const enlaceUrl = await archivoPath.getDownloadURL();
    setFotoUrl1(enlaceUrl); 
 
    const archivoPath2 = storageRef.child(`pictures/picture2-${nombreArchivo}.${extension}`);
    await archivoPath2.put(blob2, { contentType: `image/${extension}` });;
    const enlaceUrl2 = await archivoPath2.getDownloadURL();
    setFotoUrl2(enlaceUrl2); 

//console.log("POST RESPONSE: "+JSON.stringify(blob))



const agregarDatos = async () => {
 
  try {
    await firebase.db.collection(uid).add({
      nombre: nombre,
      cin: cin,
      foto1: enlaceUrl,
      foto2: enlaceUrl2,
    });
    await AsyncStorage.setItem('@datosJson', "")
    //setDocuments("");
    
    
   // console.log('Datos agregados correctamente');
  } catch (error) {
    console.error('Error al agregar datos:', error);
  }
};

agregarDatos(uid);
setRefre(true);
setProgress(false);
/*
   try {
    await ref;
   } catch (e) {
    console.log(e)
   }
*/
 
};


const cancelar = ()=>{
  setPicture1(null);
  setPicture2(null);
};


return (
  <View style={styles.container}>
  {!picture1 || !picture2 ? (
    <>

     <Camera
      style={styles.camera}
      type={Camera.Constants.Type.back}
      ref={ref => setCameraRef(ref)}>
        <View style={styles.rectangleN} />
        {!picture1 ? (
        <View style={styles.square} />
        ) : (
        <View style={styles.square2} />
        )}
        <View style={styles.rectangle} />
      </Camera>
      {!picture1 ? (
        <Text style={styles.textAyuda}>Toma la parte FRONTAL {'\u{1FAAA}'} de tu documento</Text>
        ) : (
          <Text style={styles.textAyuda}>Y ahora la parte de ATRÁS {'\u{1F4B3}'}</Text>
        )}

      <View style={styles.buttonsContainer}>
      {/**   <TouchableOpacity onPress={cancelar} disabled={!picture1}>
        <Octicons name="x-circle" size={24} color="#0D7AFF"/>
        </TouchableOpacity>*/}

        <View style={styles.miniatura}>

        </View>
      <TouchableOpacity onPress={takePicture} style={styles.circleButton}>
          <View style={styles.circle} >
          <Ionicons name="ios-camera-outline" size={40} color="white" style={styles.cam}/>
          </View>
        </TouchableOpacity>
     
    </View>
   


    </>
   

 
) : (
  <>
{progress ? (

       <ActivityIndicator size="small" color="#007AFF" style={styles.load} />
      ) : null}



  <View style={styles.lineCont}>
  
    <View style={styles.inputContainer}>
   
      <TextInput
      style={styles.inputN}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre completo"
        placeholderTextColor="#9D9CA1"
      />
     
      <TextInput
      style={styles.inputC}
        value={cin}
        onChangeText={setCin}
        placeholder="Cedula"
        placeholderTextColor="#9D9CA1"
      />
    </View>
  </View>
  <View style={styles.vista}>
  </View>
   <View style={styles.previewContainer}>
      {picture1 && <Image source={{ uri: picture1 }} style={styles.preview} />}
      {picture2 && <Image source={{ uri: picture2 }} style={styles.preview} />}
    </View>
  
 
    
  <View style={styles.buttonsContainer}>
  
  
   {fotoUrl1 && fotoUrl2 ? (
     <View>
     <TouchableOpacity style={styles.button} onPress={generatePdf}>
     <EvilIcons name="share-apple" size={30} color="white" /><Text style={styles.text} >COMPARTIR</Text>
     </TouchableOpacity>
      </View>  
   ) : (
    <>
    <TouchableOpacity style={styles.buttonS} onPress={cancelar}>
    <Text style={styles.textS} >DESCARTAR</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={savePictures}>
    <Text style={styles.text} >GUARDAR</Text>
    </TouchableOpacity>
    </>
   )}
  
 
  </View>
  
  
  </>
)}
  
  </View>
);






}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f0f2f5"
  },
  camera: {
    width: 351,
    height: 550,
    marginTop:-50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  cam:{
    transform: [{ rotate: '90deg' }]
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
    width: '100%',
    height: '8%',
 marginTop:8,
    
  },
  lineCont:{
    
    paddingTop: 2,
    marginBottom:5,
    width: '90%',
    height: "10%",
    

  },
  vista:{
    marginBottom:5,
    marginTop:-35,
    width: '90%',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
   // alignItems: 'center',
    paddingVertical: 28,
    width: '100%',
    height: '10%',
    marginTop:-18
   //backgroundColor: "#2A2A2C",
  },
  textInput: {
    paddingVertical: 3,
    fontSize:15,
    color:"#9D9CA1"
  },
  inputN:{
   // backgroundColor: "#2A2A2C",
    width: "100%",
    height: 28,
    fontSize: 25,
   

 //   borderRadius: 3,
   // paddingLeft:8,
  },
  inputC:{
 //   backgroundColor: "#2A2A2C",
    width: "40%",
    height: 28,
   marginTop:32,
    fontSize: 17,
  //  borderRadius: 3,
   // paddingLeft:8
  },

  previewContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
   // justifyContent: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    height: '70%',
    borderRadius: 3,
    padding:0

  },
  preview: {
    width: '24%',
    height: '24%',
    marginTop: 5,
    borderRadius: 5,
    transform: [{ rotate: '-90deg' }]
    
  },
  rectangle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 351,
    height: 550,
    borderWidth: 2,
    borderColor: "#0D7AFF",
    borderRadius: 20,
  },
  square: {
    position: 'relative',
   // alignItems: 'end',
   // justifyContent: 'end',
    width: 190,
    height: 140,
    borderWidth: 1,
    borderColor: "#0D7AFF",
    marginTop:350,
    marginLeft:22

  },
  square2: {
    position: 'relative',
   // alignItems: 'end',
   // justifyContent: 'end',
    width: 138,
    height: 450,
    borderWidth: 1,
    borderColor: "#0D7AFF",
   marginTop:-40,
    marginLeft:185

  },
  rectangleN: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 365,
    height: 564,
    borderWidth: 8,
    borderColor: "#e9eaee",
    borderRadius: 24,
  },
  miniatura: {
    width: 170,
    height: 120,
   // backgroundColor: 'black',
  },
  circleButton: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0D7AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
   // paddingVertical: 10,
    //marginLeft: 10,
    justifyContent: 'center',
    fontSize:20,
    color:"white"
  },
  textAyuda: {
     justifyContent: 'center',
     fontSize:16,
    color: "#424242"
   },
  textS: {
    paddingVertical: 5,
    //marginLeft: 10,
    justifyContent: 'center',
    fontSize:20,
    color:"#0D7AFF"
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#0D7AFF",
    paddingHorizontal: 17,
    marginTop:20,
    borderRadius:20,
    height:40
  },
  buttonS: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 17,
    marginTop:20,
    borderRadius:5
  },
  load:{
    marginBottom:25
  }

});