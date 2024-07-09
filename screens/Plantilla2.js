import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



// Diseños



const Plantilla2 = ({ setSwi}) => {

    
    
    



return(
    <>
    <TouchableOpacity style={styles.comp} onPress={() => setSwi(12)}>
    <Ionicons name="color-palette-outline" size={22} color="#1863FF" />
</TouchableOpacity>
    </>
)
    
}

const styles = StyleSheet.create({

    comp:{
        width: 35, // Ancho del círculo
        height: 35, // Alto del círculo
        borderRadius: 20, // Mitad del ancho y alto para hacer el círculo
   //     borderColor:"#0D7AFF",
   //     borderWidth:1,
      //  backgroundColor: "#F3F3F6", // Color gris claro
        justifyContent: 'center', // Centrar contenido verticalmente
        alignItems: 'center', // Centrar contenido horizontalmente
        marginHorizontal: 5, // Espacio entre los botones
      },
})

export default Plantilla2;