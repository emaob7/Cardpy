import React from 'react';
import { View, TextInput,StyleSheet,Text} from 'react-native';

const FormContactos = ({ telef, setTelef, correo, setCorreo, setDirecc, direcc,  swi }) => {
 



  return (
    <View style={styles.container}>



      
{swi === 4 ? (
  <>
     <TextInput 
          style={styles.input}
          placeholder="Telefono"
          value={telef}
          onChangeText={setTelef}
        />
        <TextInput 
          style={styles.input}
          placeholder="Email"
          value={correo}
          onChangeText={setCorreo}
        />
         <TextInput 
          style={styles.input}
          placeholder="Direccion"
          value={direcc}
          onChangeText={setDirecc}
        />

 
</>

      ) : 
      
      <View style={styles.chipsCont}>
       {telef ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {telef} 
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Telefono?
    </Text>
  </View>
)}
         {correo ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {correo}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Correo?
    </Text>
  </View>
)}
  {direcc ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {direcc}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Direccion?
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
        color: "CCCCCC",
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
export default FormContactos;
