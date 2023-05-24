import React, { useState } from 'react';
import { StyleSheet,View, Button, Image, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import firebase from "./firebase";
import {v4 as uuidv4} from "uuid";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

 

export default function CameraScreen({ route }) {

  const [cameraRef, setCameraRef] = useState(null);
  const [picture1, setPicture1] = useState(null);
  const [picture2, setPicture2] = useState(null);
  const [fotoUrl1, setFotoUrl1] = useState(null);
  const [fotoUrl2, setFotoUrl2] = useState(null);

  const { uid } = route.params;

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
    max-width: 72%;
    max-height: 72%;
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
  const file = await printToFileAsync({
    html: html,
    base64: false
  });

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
      nombre: 'Juan',
      edad: 25,
      email: 'juan@example.com',
      foto1: enlaceUrl,
      foto2: enlaceUrl2,
    });
    await AsyncStorage.setItem('@datosJson', "")
   // console.log('Datos agregados correctamente');
  } catch (error) {
    console.error('Error al agregar datos:', error);
  }
};

agregarDatos(uid);
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
        <View style={styles.rectangle} />
      </Camera>

      <View style={styles.buttonsContainer}>
      <Button title="Borrar" onPress={cancelar} disabled={!picture1} />
      <TouchableOpacity onPress={takePicture} style={styles.circleButton}>
          <View style={styles.circle} />
        </TouchableOpacity>
     
    </View>
   


    </>
   

 
) : (
  <>
   <View style={styles.previewContainer}>
      {picture1 && <Image source={{ uri: picture1 }} style={styles.preview} />}
      {picture2 && <Image source={{ uri: picture2 }} style={styles.preview} />}
    </View>
  <View style={styles.buttonsContainer}>
  <Button title="Repetir" onPress={cancelar} disabled={!picture1} />
   {fotoUrl1 && fotoUrl2 ? (
     <View>
     <TouchableOpacity style={styles.button} onPress={generatePdf}>
     <EvilIcons name="share-apple" size={30} color="#0D7AFF" /><Text style={styles.text} >Compartir PDF</Text>
     </TouchableOpacity>
      </View>  
   ) : (
   <Button title="Guardar" onPress={savePictures}/>
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
    backgroundColor: "#000"
  },
  camera: {
    width: 351,
    height: 550,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    width: '100%',
    height: '25%',
  },
  previewContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 20,
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
  },
  text: {
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
    fontSize:20,
    color:"#0D7AFF"
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //backgroundColor: 'gray'
  },

});