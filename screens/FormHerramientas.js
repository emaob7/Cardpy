import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FormHerramientas = ({ herramientas, setHerramientas, swi }) => {
  const addHerramienta = () => {
    setHerramientas([...herramientas, { herrami: '', nivel: '' }]);
  };

  const removeHerramienta = (index) => {

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
            const updatedHerramientas = [...herramientas];
    updatedHerramientas.splice(index, 1);
    setHerramientas(updatedHerramientas);
          },
        },
      ],
      { cancelable: false }
    );
    
  };

  const handleInputChange = (text, index, field) => {
    const updatedHerramientas = [...herramientas];
    updatedHerramientas[index][field] = text;
    setHerramientas(updatedHerramientas);
  };



  return (
    <View style={styles.container}>



      
{swi === 10 ? (
  <>
      {herramientas.map((herramienta, index) => (
        <View key={index} style={styles.divider}>
          <TextInput
          style={styles.input}
            placeholder="Herramienta o Habilidad"
            value={herramienta.herrami}
            onChangeText={(text) => handleInputChange(text, index, 'herrami')}
          />
          <TextInput
          style={styles.inputN}
            placeholder="Nivel"
            value={herramienta.nivel}
            onChangeText={(text) => handleInputChange(text, index, 'nivel')}
          />




          <TouchableOpacity onPress={() => removeHerramienta(index)} >
          <Feather name="x-circle" size={24} color="#003e2e" />
      </TouchableOpacity>
         
        </View>
        
      ))}
 <Button title="Agregar Herramienta" onPress={addHerramienta} />
</>

      ) : 
      
      <View style={styles.chipsCont}>
{herramientas.map((herramienta, index) => (
        <View key={index} style={styles.chips}>
         <Text style={styles.chipsT}>
         {herramienta.herrami}
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
      marginHorizontal:10
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
export default FormHerramientas;
