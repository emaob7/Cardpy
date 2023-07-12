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

  const html = `
    <html>
    <head>
	<style>
  .image-container {
    display: flex;
    justify-content: space-between;
    padding: 10px 50px 20px;
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
        
        
        <div class="image-container">
        <div class="image-wrapper">
          <img class="imagen" src=${documents.foto1} alt="Licencia 1">
          
        </div>
        <div class="image-wrapper">
          <img class="imagen" src=${documents.foto2} alt="Licencia 2">
          
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
      <Image source={{ uri: documents.foto1 }} style={styles.preview} />
      <Image source={{ uri: documents.foto2 }} style={styles.preview} />
    </View>

    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={generatePdf}>
      <EvilIcons name="share-apple" size={30} color="#0D7AFF" /><Text style={styles.text} >Compartir PDF</Text>
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
  textInput: {
    alignSelf: "stretch",
    padding: 8,
    margin: 8
  },
  preview: {
    width: '24%',
    height: '24%',
    marginTop: 5,
    borderRadius: 5,
    transform: [{ rotate: '-90deg' }]
    
  },
  previewContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    width: '90%',
    height: '70%',
    borderRadius: 3,
    padding:0,
    marginTop:5

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
    //backgroundColor: 'gray'
  },
  text: {
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
    fontSize:20,
    color:"#0D7AFF"
  },
  load:{
    marginBottom:25
  }
});

export default DocumentDetailsScreen;
