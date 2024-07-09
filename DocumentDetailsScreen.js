import React, { useState } from 'react';
//desde aqui
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Image, Text,ActivityIndicator } from 'react-native';
import EnviarPdf from './EnviarPdf';




const DocumentDetailsScreen = ({ route }) => {
  const { documents } = route.params;
  const [progress, setProgress] = useState(null);



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
    <EnviarPdf
     nombre={documents.nombre}
     cin={documents.cin}
     fotoUrl1={documents.foto1}
     fotoUrl2={documents.foto2}
     setProgress={setProgress}
     />
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
    height: '60%',
    borderRadius: 3,
    padding:0,
    marginTop:-28

  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
   // paddingVertical: 10,
    width: '100%',
    height: '20%',
  },

  text: {
   // paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
    fontSize:15,
    color:"#FFFFFF"
  },
  load:{
    marginBottom:25
  }
});

export default DocumentDetailsScreen;
