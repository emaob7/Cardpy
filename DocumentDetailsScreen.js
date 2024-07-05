import React, { useState } from 'react';
//desde aqui
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Image, Text,TouchableOpacity,ActivityIndicator } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';




const DocumentDetailsScreen = ({ route }) => {
  const { documents } = route.params;
  const [progress, setProgress] = useState(null);
  //desde aqui


  const dcin= documents.cin.length > 0 ? `<span>, con CIN: ${documents.cin}</span>` : '';
  const dnombre= documents.nombre.length > 0 ? `<span>Fotocopia de cédula de ${documents.nombre}</span>` : '';

  const html = `
  <html>
  <head>
    <style>
      .container {
        text-align: center;
        padding: 20px;
      }
  
      .title {
        font-size: 18px;
        margin-bottom: 20px;
      }
  
      .image-container {
        display: flex;
        justify-content: center;
        gap: 130px; /* Añade espacio entre las imágenes */
        padding: 10px 50px 20px;
        margin-top: -50px;
      }
    
      .image-wrapper {
        width: auto;
      }
    
      .imagen {
        border-radius: 10px;
        width: 200px; /* Ajusta el tamaño aquí según sea necesario */
        transform: rotate(-90deg);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="title">
      <p>
        ${dnombre} ${dcin}
        </p>
      </div>
      <div class="image-container">
        <div class="image-wrapper">
          <img class="imagen" src="${documents.foto1}" alt="Licencia 1">
        </div>
        <div class="image-wrapper">
          <img class="imagen" src="${documents.foto2}" alt="Licencia 2">
        </div>
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
  //hasta aqui

  return (
    <View style={styles.container}>
      {progress ? (

<ActivityIndicator size="small" color="#007AFF" style={styles.load} />
) : null}
 
      <View style={styles.previewContainer}>
      {documents.nombre ? (
      <Text style={styles.title}>
          Fotocopia de cédula de {documents.nombre}, con CIN {documents.cin}
        </Text>
) : null}
        <View style={styles.imagesContainer}>
          <Image source={{ uri: documents.foto1 }} style={styles.preview} />
          <Image source={{ uri: documents.foto2 }} style={styles.preview} />
        </View>
    </View>

    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={generatePdf}>
      <EvilIcons name="share-apple" size={30} color="#FFFFFF" /><Text style={styles.text} >Enviar PDF</Text>
      </TouchableOpacity>
       </View>
     
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: "#F6F6F6"
  },
  title: {
    fontSize: 11,
    marginTop:10,
    textAlign: 'center',
    padding:12
  },
  imagesContainer: {
    flexDirection: 'row',
    marginTop:-15
   // justifyContent: 'space-between',
    //alignItems: 'center',
  },

  textInput: {
    alignSelf: "stretch",
    padding: 8,
    margin: 8
  },
  preview: {
    width: 100,
    height: 150,
    marginHorizontal: 30,
    borderRadius: 5,
    transform: [{ rotate: '-90deg' }]
    
  },
  previewContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
   //justifyContent: 'center',
   alignItems: 'center',
    width: '90%',
    height: '70%',
    borderRadius: 3,
    padding:0,
    marginTop:0

  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    width: '100%',
    height: '20%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#0D7AFF",
    paddingHorizontal: 20,
    paddingVertical:10,
    marginTop:5,
    borderRadius:20,
    height:40
  },
  text: {
   // paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
    fontSize:20,
    color:"#FFFFFF"
  },
  load:{
    marginBottom:25
  }
});

export default DocumentDetailsScreen;
