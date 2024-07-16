import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FormReferencias = ({ referencias, setReferencias, swi }) => {
  const addReferencia = () => {
    setReferencias([...referencias, { refe: '', telef: '' }]);
  };

  const removeReferencia = (index) => {
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
            const updatedReferencias = [...referencias];
    updatedReferencias.splice(index, 1);
    setReferencias(updatedReferencias);
          },
        },
      ],
      { cancelable: false }
    );
   
  };

  const handleInputChange = (text, index, field) => {
    const updatedReferencias = [...referencias];
    updatedReferencias[index][field] = text;
    setReferencias(updatedReferencias);
  };



  return (
    <View style={styles.container}>



      
{swi === 11 ? (
  <>
      {referencias.map((referencia, index) => (
        <View key={index} style={styles.divider}>
          <TextInput
          style={styles.input}
            placeholder="Nombre Referencia"
            value={referencia.refe}
            onChangeText={(text) => handleInputChange(text, index, 'refe')}
          />
          <TextInput
          style={styles.inputN}
            placeholder="Telefono"
            value={referencia.telef}
            onChangeText={(text) => handleInputChange(text, index, 'telef')}
          />




          <TouchableOpacity onPress={() => removeReferencia(index)} >
          <Feather name="x-circle" size={24} color="#003e2e" />
      </TouchableOpacity>
         
        </View>
        
      ))}
 <Button title="Agregar Referencia" onPress={addReferencia} />
</>

      ) : 
      
      <View style={styles.chipsCont}>
{referencias.map((referencia, index) => (
        <View key={index} style={styles.chips}>
         <Text style={styles.chipsT}>
         {referencia.refe}
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
          
          backgroundColor: '#ECEFF1',
              padding: 10,
              margin: 5,
              width: "60%",
              borderRadius:10
        }, 
        inputN:{
          backgroundColor: '#ECEFF1',
          padding: 10,
          margin: 5,
          width: "30%",
          borderRadius:10
    }, 

  })
export default FormReferencias;
