import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';




const Plantilla2 = ({ setSwi}) => {

    
    
    



return(
    <>
    <TouchableOpacity style={styles.comp} onPress={() => setSwi(12)}>
    <Ionicons name="color-palette-outline" size={24} color="#0D7AFF" />
</TouchableOpacity>
    </>
)
    
}

const styles = StyleSheet.create({

    comp:{
        width: 40, // Ancho del círculo
        height: 40, // Alto del círculo
        borderRadius: 20, // Mitad del ancho y alto para hacer el círculo
        backgroundColor: "#F3F3F6", // Color gris claro
        justifyContent: 'center', // Centrar contenido verticalmente
        alignItems: 'center', // Centrar contenido horizontalmente
        marginHorizontal: 5, // Espacio entre los botones
      },
})

export default Plantilla2;