import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FormGenerales = ({ especificas, setEspecificas, swi }) => {
  const addEspecifica = () => {
    setEspecificas([...especificas, { empre:"", puesto:"",ciudad:"",desde:"",hasta:"",tareas:""}]);
  };

  const removeEspecifica = (index) => {
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
            const updatedEspecificas = [...especificas];
            updatedEspecificas.splice(index, 1);
            setEspecificas(updatedEspecificas);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleInputChange = (text, index, field) => {
    const updatedEspecificas = [...especificas];
    updatedEspecificas[index][field] = text;
    setEspecificas(updatedEspecificas);
  };



  return (
    <View style={styles.container}>



      
{swi === 6 ? (
  <>
      {especificas.map((especifica, index) => (
        <View key={index} style={styles.divider}>
            <View  style={styles.eliminar}>
            <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {especifica.empre}
         </Text>
        </View>
                
            <TouchableOpacity onPress={() => removeEspecifica(index)} >
          <Feather name="x-circle" size={24} color="#003e2e" />
      </TouchableOpacity>
            </View>
            
          <TextInput
          style={styles.inputN}
            placeholder="Empresa/ Proyecto"
            value={especifica.empre}
            onChangeText={(text) => handleInputChange(text, index, 'empre')}
          />
          <TextInput
          style={styles.input}
            placeholder="Puesto"
            value={especifica.puesto}
            onChangeText={(text) => handleInputChange(text, index, 'puesto')}
          />
        <TextInput
          style={styles.input}
            placeholder="Ciudad"
            value={especifica.ciudad}
            onChangeText={(text) => handleInputChange(text, index, 'ciudad')}
          />
                  <TextInput
          style={styles.input}
            placeholder="Desde fecha"
            value={especifica.desde}
            onChangeText={(text) => handleInputChange(text, index, 'desde')}
          />
            <TextInput
          style={styles.input}
            placeholder="Hasta fecha"
            value={especifica.hasta}
            onChangeText={(text) => handleInputChange(text, index, 'hasta')}
          /><TextInput
          multiline
          numberOfLines={3}
          style={styles.inputTa}
            placeholder="Tareas o logros en el puesto"
            value={especifica.tareas}
            onChangeText={(text) => handleInputChange(text, index, 'tareas')}
          />


         
         
        </View>
        
      ))}
 <Button title="Agregar Experiencia" onPress={addEspecifica}/>
</>

      ) : 
      
      <View style={styles.chipsCont}>
{especificas.map((especifica, index) => (
        <View key={index} style={styles.chips}>
         <Text style={styles.chipsT}>
         {especifica.empre}
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
          flexWrap: 'wrap',
      paddingBottom:5
      ,width: "100%",
        },
        eliminar:{
            width: "100%",
            flexDirection: 'row', 
          //  justifyContent: 'space-between'
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
              width: "47%",
              borderRadius:10
        }, 
        inputN:{
          borderWidth: 1,
          borderColor: '#FAFAFA',
          padding: 10,
          margin: 5,
          width: "97%",
          borderRadius:10
    }, 
    inputTa:{
        borderWidth: 1,
        borderColor: '#FAFAFA',
        padding: 10,
        margin: 5,
        width: "97%",
        borderRadius:10,
        height:70
  }, 

  })
export default FormGenerales;
