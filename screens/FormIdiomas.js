import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FormIdiomas = ({ idioma, setIdioma, swi }) => {
  const addIdioma = () => {
    setIdioma([...idioma, { idi: '', nivel: '' }]);
  };

  const removeIdioma = (index) => {

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
            const updatedIdioma = [...idioma];
    updatedIdioma.splice(index, 1);
    setIdioma(updatedIdioma);
          },
        },
      ],
      { cancelable: false }
    );
    
  };

  const handleInputChange = (text, index, field) => {
    const updatedIdioma = [...idioma];
    updatedIdioma[index][field] = text;
    setIdioma(updatedIdioma);
  };



  return (
    <View style={styles.container}>



      
{swi === 9 ? (
  <>
      {idioma.map((idiomas, index) => (
        <View key={index} style={styles.divider}>
          <TextInput
          style={styles.input}
            placeholder="Idioma"
            value={idiomas.idi}
            onChangeText={(text) => handleInputChange(text, index, 'idi')}
          />
          <TextInput
          style={styles.inputN}
            placeholder="Nivel"
            value={idiomas.nivel}
            onChangeText={(text) => handleInputChange(text, index, 'nivel')}
          />




          <TouchableOpacity onPress={() => removeIdioma(index)} >
          <Feather name="x-circle" size={24} color="#003e2e" />
      </TouchableOpacity>
         
        </View>
        
      ))}
 <Button title="Agregar Idioma" onPress={addIdioma} />
</>

      ) : 
      
      <View style={styles.chipsCont}>
{idioma.map((idiomas, index) => (
        <View key={index} style={styles.chips}>
         <Text style={styles.chipsT}>
         {idiomas.idi}
         </Text>
        </View>
        
      ))}
</View>
      }
     
    </View>
  );
};
const styles = StyleSheet.create({

  container: {
      flex: 1,
    },
        divider:{
          
          flexDirection: "row",
      paddingBottom:5
      ,width: "100%",
        },

      chipsT:{

color: "#000000"

      },
      chipsCont:{

        flexDirection: 'row', 
        flexWrap: 'wrap',
        
              },
      chips:{
        backgroundColor:"#bbdefb",
        padding:8,
        marginRight:3,
        marginBottom:3,
        borderRadius:20,
        
              },
      
        
        input:{
          
              borderWidth: 1,
              borderColor: '#FAFAFA',
              padding: 10,
              margin: 5,
              width: "60%",
              borderRadius:10
        }, 
        inputN:{
          borderWidth: 1,
          borderColor: '#FAFAFA',
          padding: 10,
          margin: 5,
          width: "30%",
          borderRadius:10
    }, 

  })
export default FormIdiomas;
