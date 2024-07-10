import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
const ShareInstructions = ({ icon, text }) => {
  return (
    <View style={styles.instruccion}>
<EvilIcons name={icon} size={18} color="#6E7586" />
      <Text style={styles.textIn}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    instruccion: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingRight:22,
        marginLeft:10,
        width:'90%'
      },
      textIn: {
        marginLeft: 2,
        fontSize: 11,
        color: '#6E7586',
      },
});

export default ShareInstructions;
