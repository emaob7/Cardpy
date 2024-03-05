import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const Plantilla2 = ({}) => {

    
    
    



return(
    <>
    <TouchableOpacity style={styles.comp} onPress={""}>
    <MaterialCommunityIcons name="palette-outline" size={30} color="#0D7AFF"/>
</TouchableOpacity>
    </>
)
    
}

const styles = StyleSheet.create({

    comp:{
        margin:16,
        backgroundColor: "white",
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius:50
      },
})

export default Plantilla2;