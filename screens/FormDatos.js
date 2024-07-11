import React from 'react';
import { View, TextInput,StyleSheet,Text} from 'react-native';

const FormDatos = ({ nombre,setNombre, apellido, setApellido, cin, setCin, fnac, setFnac, nacio, setNacio, profesion, setProfesion, registro, setRegistro,  swi }) => {
 



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
       {nombre ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {nombre} {apellido}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Nombre y Apellido?
    </Text>
  </View>
)}
         {cin ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {cin}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      CIN?
    </Text>
  </View>
)}
  {fnac ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {fnac}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Fecha de Nacimiento?
    </Text>
  </View>
)}
  {nacio ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {nacio}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Nacionalidad?
    </Text>
  </View>
)}
  {profesion ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {profesion}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Profesión?
    </Text>
  </View>
)}
             {registro ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {registro}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Registro Profesional?
    </Text>
  </View>
)}
        
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
      chipsTG:{
        color: "#000000",
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
              chipsG:{
                backgroundColor:"#F0F4EF",
                padding:8,
                marginRight:3,
                marginBottom:3,
                borderRadius:20,
                
                      },
      
        
        input:{
          
              borderWidth: 1,
              borderColor: '#CCCCCC',
              padding: 10,
              margin: 5,
              width: "95%",
              borderRadius:10
        }, 
        inputN:{
          borderWidth: 1,
          borderColor: '#CCCCCC',
          padding: 10,
          margin: 5,
          width: "30%",
          borderRadius:10
    }, 

  })
export default FormDatos;
