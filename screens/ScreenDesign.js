import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';




const ScreenDesign = ({des, setDes, setSwi}) => {

    
    const handleButtonPress = (value) => {
        // Cambiar el valor de setDes y setSwi al mismo tiempo
        setDes(value);
        setSwi(""); // Reemplaza "" con el valor deseado para setSwi
      };
    
    



return(
    <>
         <TouchableOpacity style={styles.comp} onPress={() => handleButtonPress(1)}>
        <Text>Moon</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.comp} onPress={() => handleButtonPress(2)}>
        <Text>Cesar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.comp} onPress={() => handleButtonPress(3)}>
        <Text>General</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.comp} onPress={() => handleButtonPress(4)}>
        <Text>Harvard</Text>
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

export default ScreenDesign;