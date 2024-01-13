import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';



const CurriculumScreen = (props) => {
    const  {uid}  = props;


  return(
    <View style={styles.container}>
 <Text style={styles.super}>Curriculum</Text>
    </View>
  );  
}
const styles = StyleSheet.create({

container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
  },
    super: {
        fontSize: 30,
        alignContent:"flex-start",
        marginStart:-220,
        marginTop:18,
        fontWeight: 'bold',
      },
})
export default CurriculumScreen;
