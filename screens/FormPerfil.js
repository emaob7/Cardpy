import React from 'react';
import { View, TextInput,StyleSheet,Text} from 'react-native';

const FormPerfil = ({ descripcion, setDescripcion,  swi }) => {
 



  return (
    <View style={styles.container}>



      
{swi === 2 ? (
  <>
 <View style={styles.divider}>
 <TextInput
        multiline
        numberOfLines={5}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Escribe aquí..."
        style={{
          borderWidth: 1,
          borderColor: '#FAFAFA',
          borderRadius: 10,
          padding: 10,
          height: 130, // Ajusta la altura según tus necesidades
        }}
      />
 </View>
</>

      ) : 
      
      <View style={styles.chipsCont}>
       {descripcion ? (
  <View style={styles.chips}>
    <Text style={styles.chipsT}>
      {descripcion}
    </Text>
  </View>
) : (
  <View style={styles.chipsG}>
    <Text style={styles.chipsTG}>
      Descripción?
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
        color: "#FAFAFA",
              },
      chipsCont:{

        flexDirection: 'row', 
        flexWrap: 'wrap',
        
              },
      chips:{
        backgroundColor:"#bbdefb",
        padding:15,
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
              borderColor: '#FAFAFA',
              padding: 10,
              margin: 5,
              width: "95%",
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
export default FormPerfil;
