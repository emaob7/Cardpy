import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FormDatos = ({ nombre,setNombre, apellido, setApellido, cin, setCin, fnac, setFnac, nacio, setNacio, profesion, setProfesion, registro, setRegistro,  swi }) => {
 


  const handleInputChange = (text, index, field) => {
    const updatedIdioma = [...idioma];
    updatedIdioma[index][field] = text;
    setIdioma(updatedIdioma);
  };



  return (
    <View style={styles.container}>



      
{swi === 3 ? (
  <>
     <TextInput 
          style={styles.input}
          placeholder="Nombres"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput 
          style={styles.input}
          placeholder="Apellidos"
          value={apellido}
          onChangeText={setApellido}
        />
         <TextInput 
          style={styles.input}
          placeholder="CIN"
          value={cin}
          onChangeText={setCin}
        />

  <TextInput 
          style={styles.input}
          placeholder="Fecha de Nacimiento"
          value={fnac}
          onChangeText={setFnac}
        />
        <TextInput 
          style={styles.input}
          placeholder="Nacionalidad"
          value={nacio}
          onChangeText={setNacio}
        />
        <TextInput 
          style={styles.input}
          placeholder="Profesion"
          value={profesion}
          onChangeText={setProfesion}
        />

 
  
  
  <TextInput 
          style={styles.input}
          placeholder="Registro Profesional Numero"
          value={registro}
          onChangeText={setRegistro}
        />
</>

      ) : 
      
      <View style={styles.chipsCont}>
        <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {nombre} {apellido}
         </Text>
        </View>
        <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {cin}
         </Text>
        </View>
        <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {fnac}
         </Text>
        </View>
        <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {nacio}
         </Text>
        </View>
        <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {profesion}
         </Text>
        </View>
        <View style={styles.chips}>
         <Text style={styles.chipsT}>
         {registro}
         </Text>
        </View>
        
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
              width: "60%",
              borderRadius:10
        }, 
        inputN:{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          margin: 5,
          width: "30%",
          borderRadius:10
    }, 

  })
export default FormDatos;
