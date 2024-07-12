import React from 'react';
import { View,Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

const designData = [
  { id: '1', image: require('../assets/cvd/moon.png') },
  { id: '2', image: require('../assets/cvd/cesar.png') },
  { id: '3', image: require('../assets/cvd/general.png') },
  { id: '4', image: require('../assets/cvd/hardvard.png') },
  // Añade más diseños aquí
];





const ScreenDesign = ({ setDes, setSwi}) => {




    
    const handleButtonPress = (value) => {
        // Cambiar el valor de setDes y setSwi al mismo tiempo
        setDes(value);
        setSwi(""); // Reemplaza "" con el valor deseado para setSwi
      };
    
    



return(
    <View style={styles.gallery}>
         <TouchableOpacity style={styles.comp}  onPress={() => handleButtonPress(1)}>
         <Text style={styles.text}>Moon</Text>
         <Image source={designData[0].image} style={styles.thumbnail} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.comp} onPress={() => handleButtonPress(2)}>
      <Text style={styles.text}>Cesar</Text>
      <Image source={designData[1].image} style={styles.thumbnail} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.comp} onPress={() => handleButtonPress(3)}>
        <Text style={styles.text}>General</Text>
        <Image source={designData[2].image} style={styles.thumbnail} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.comp} onPress={() => handleButtonPress(4)}>
        <Text style={styles.text}>Harvard</Text>
        <Image source={designData[3].image} style={styles.thumbnail} />
      </TouchableOpacity>
    </View>
)
    
}

const styles = StyleSheet.create({

    comp:{
        width:"40%",
        marginHorizontal:10,
        marginBottom:19,
        //padding:10
       
      },
      gallery: {
        marginTop:10,
        marginLeft:-10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      thumbnail: {
        width: 165,
        height: 237,
        margin: 10,
        borderColor:"#CCCCCC",
        borderWidth:1,
        borderRadius:5,
        
      },
      text:{
        marginLeft:10
      }
})

export default ScreenDesign;




