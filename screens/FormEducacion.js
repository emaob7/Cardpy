import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FormEducacion = ({ educacion, setEducacion, swi }) => {
  const addEducacion = () => {
    setEducacion([...educacion, { titulo:"", institucion:"",duracion:"",culminacion:""}]);
  };

  const removeEducacion = (index) => {
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
            const updatedEducacion = [...educacion];
            updatedEducacion.splice(index, 1);
            setEducacion(updatedEducacion);
          },
        },
      ],
      { cancelable: false }
    );


  };

  const handleInputChange = (text, index, field) => {
    const updatedEducacion = [...educacion];
    updatedEducacion[index][field] = text;
    setEducacion(updatedEducacion);
  };



  return (
    <View style={styles.container}>



      
{swi === 7 ? (
  <>
      {educacion.map((edu, index) => (
        <View key={index} style={styles.divider}>
            <View  style={styles.eliminar}>
            <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {edu.titulo}
         </Text>
        </View>
                
            <TouchableOpacity onPress={() => removeEducacion(index)} >
          <Feather name="x-circle" size={24} color="red" />
      </TouchableOpacity>
            </View>
            
          <TextInput
          style={styles.input}
            placeholder="Titulo"
            value={edu.titulo}
            onChangeText={(text) => handleInputChange(text, index, 'titulo')}
          />
          <TextInput
          style={styles.input}
            placeholder="Institucion"
            value={edu.institucion}
            onChangeText={(text) => handleInputChange(text, index, 'institucion')}
          />
        <TextInput
          style={styles.input}
            placeholder="Duracion"
            value={edu.duracion}
            onChangeText={(text) => handleInputChange(text, index, 'duracion')}
          />
                  <TextInput
          style={styles.input}
            placeholder="Fecha culminacion"
            value={edu.culminacion}
            onChangeText={(text) => handleInputChange(text, index, 'culminacion')}
          />
            
         
        </View>
        
      ))}
 <Button title="Agregar Educacion" onPress={addEducacion}/>
</>

      ) : 
      
      <View style={styles.chipsCont}>
{educacion.map((edu, index) => (
        <View key={index} style={styles.chips}>
         <Text style={styles.chipsT}>
         {edu.titulo}
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
          flexWrap: 'wrap',
      paddingBottom:5
      ,width: "100%",
        },
        eliminar:{
            width: "100%",
            flexDirection: 'row', 
           // justifyContent: 'space-between'
        },

      chipsT:{

color: "black"

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
              borderColor: '#ccc',
              padding: 10,
              margin: 5,
              width: "47%",
              borderRadius:10
        }, 
       


  })
export default FormEducacion;