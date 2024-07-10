import React, { useState} from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Button, Modal, ScrollView, Image,Pressable } from 'react-native';
import firebase from "./firebase";
//import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Perfil () {

  const navigation = useNavigation();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
 // const auth = getAuth();



const handleLogout = async() => {
   //const userData = await AsyncStorage.getItem('user');
   //console.log("User logged in memory!", userData);

    
       await firebase.auth.signOut().then(() => {
            console.log("se cerro sesion");
            
         }); 
    
         await AsyncStorage.removeItem('user');
         await AsyncStorage.removeItem('@datosJson');
         await AsyncStorage.removeItem('@datosJsonCv');
         console.log('Usuario eliminado de AsyncStorage');
         navigation.navigate("Login")
        
  }; 
  
  return (
    <View style={styles.container}>
      <Text>Nuestros Robots estan trabajando incanzablemente para mejorar esta pantalla con tus datos y mas opciones&#x2699;&#x1F916;</Text>
      <Text style={styles.link} onPress={() => setModalVisible(true)}>Términos de Servicio</Text>
      <Text style={styles.link} onPress={() => setModalVisible2(true)}>Declaración de privacidad</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.textButton}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalTitle}>Términos de Servicio</Text>
              <Text style={styles.modalText}>
                {/* Aquí puedes copiar y pegar los términos de servicio que redactaste anteriormente */}
                Bienvenido a Cardpy. Al utilizar nuestra aplicación, aceptas cumplir con los siguientes términos de servicio. Si no estás de acuerdo con estos términos, no debes utilizar la aplicación.
                {'\n\n'}1. Aceptación de los términos
                Al crear una cuenta y utilizar Cardpy, aceptas estos términos de servicio en su totalidad.
                {'\n\n'}2. Descripción del servicio
                Cardpy permite a los usuarios crear currículums y tarjetas de identificación en formato PDF. Los servicios proporcionados pueden actualizarse o cambiar a discreción de la empresa.
                {'\n\n'}3. Uso permitido
                Eres responsable de cualquier actividad que ocurra a través de tu cuenta. Debes proporcionar información veraz y precisa y mantener la confidencialidad de tus credenciales de inicio de sesión.
                {'\n\n'}4. Derechos y responsabilidades del usuario
                - No debes usar la aplicación para actividades ilegales o no autorizadas.
                - No debes modificar, adaptar, hackear, o hacer ingeniería inversa de la aplicación.
                - No debes cargar contenido que sea ofensivo, abusivo, difamatorio, o que infrinja los derechos de terceros.
                {'\n\n'}5. Privacidad y manejo de datos
                Cardpy se compromete a proteger tu privacidad. Consulta nuestra Política de Privacidad para obtener más detalles sobre cómo manejamos tu información personal.
                {'\n\n'}6. Propiedad intelectual
                Todos los contenidos, marcas registradas, logotipos y gráficos proporcionados por Cardpy son propiedad de Cardpy y están protegidos por leyes de propiedad intelectual.
                {'\n\n'}7. Limitación de responsabilidad
                Cardpy no será responsable de ningún daño directo, indirecto, incidental, especial, o consecuente que resulte del uso o la incapacidad de usar la aplicación. Además, Cardpy no será responsable si la información de tu cuenta es hackeada o comprometida de alguna manera. Los usuarios son responsables de tomar las medidas necesarias para proteger sus cuentas.
                {'\n\n'}8. Modificaciones de los términos
                Nos reservamos el derecho de modificar estos términos de servicio en cualquier momento. Notificaremos a los usuarios sobre cualquier cambio significativo. El uso continuo de la aplicación después de la notificación de cambios constituye tu aceptación de los nuevos términos.
                {'\n\n'}9. Contacto
                Si tienes alguna pregunta sobre estos términos, por favor contacta con nosotros a cardpy7@gmail.com .
              </Text>
            </ScrollView>
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalTitle}>Declaración de Privacidad</Text>
              <Text style={styles.modalTitle}>Última actualización: 10 de julio, 2024</Text>
              <Text style={styles.modalText}>
                {/* Aquí puedes copiar y pegar los términos de servicio que redactaste anteriormente */}
                En Cardpy, respetamos tu privacidad y nos comprometemos a proteger tu información personal. Esta declaración de privacidad explica cómo recopilamos, usamos y compartimos tu información.
                {'\n\n'}1. Información que recolectamos
                {'\n'}- Información personal: Cuando creas una cuenta en Cardpy, podemos recopilar información como tu nombre, dirección de correo electrónico y otros datos necesarios para el funcionamiento de la aplicación.
                {'\n'}- Información no personal: También recopilamos información no personal, como datos del dispositivo, información de uso y datos analíticos.
                {'\n\n'}2. Uso de la información
                {'\n'}- Utilizamos la información recopilada para mejorar y personalizar tu experiencia en Cardpy.
                {'\n'}- Para comunicarte actualizaciones, promociones y otra información relacionada con el servicio.
                {'\n'}- Para asegurar y mantener la integridad de nuestros servicios.
                {'\n\n'}3. Compartir información
                {'\n'}- No compartimos tu información personal con terceros, excepto cuando sea necesario para proporcionar los servicios de Cardpy, cumplir con la ley, o proteger nuestros derechos.
                {'\n'}- Podemos compartir información no personal con socios y proveedores de servicios para análisis y mejoras.
                {'\n\n'}4. Seguridad de los datos
                {'\n'}Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra el acceso, alteración, divulgación o destrucción no autorizada.
                {'\n\n'}5. Derechos del usuario
                {'\n'}Tienes derecho a acceder, corregir, o eliminar tu información personal en cualquier momento. Para ejercer estos derechos, por favor contacta con nosotros a cardpy7@gmail.com .
                {'\n\n'}6. Cambios en la política de privacidad
                {'\n'}Nos reservamos el derecho de modificar esta declaración de privacidad en cualquier momento. Notificaremos a los usuarios sobre cualquier cambio significativo a través de la aplicación o por correo electrónico.
                {'\n\n'}7. Contacto
                {'\n'}Si tienes alguna pregunta o preocupación sobre nuestra política de privacidad, por favor contacta con nosotros a cardpy7@gmail.com .
              </Text>
            </ScrollView>
            <Button
              title="Cerrar"
              onPress={() => setModalVisible2(!modalVisible2)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAF1FB',
    paddingTop: 90,
   // paddingLeft: 20
  },
  
  text:{
    fontWeight: 'bold',
    color: "#424242"
  },

  textButton:{
    fontWeight: 'bold',
    color: "#FFFFFF"
  },

  button: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#1462fc",
    paddingHorizontal: 17,
    marginTop:20,
    borderRadius:10,
    height:40,
    width:150,
   // marginLeft: -20
  },
  buttonC: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:30,
    height:40,
    width:250,
    marginLeft: -20
  },
  buttonContent:{
    alignItems:"center",
    marginBottom:38,
    
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',

    
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop:15,
    marginLeft: -20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginLeft:10,
  },
  link: {
    color: 'blue',
    marginVertical:8
   // textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingTop:90,
    paddingBottom:60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },



});

/*

import React, { useEffect, useState } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';

const App = () => {
  const [storageSize, setStorageSize] = useState(0);

  useEffect(() => {
    calcularTamanoAsyncStorage();
  }, []);

  const calcularTamanoAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;

      for (let key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }

      setStorageSize(totalSize);
    } catch (error) {
      console.error('Error calculando el tamaño del AsyncStorage:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Tamaño total de AsyncStorage: {storageSize} bytes</Text>
      <Button title="Recalcular" onPress={calcularTamanoAsyncStorage} />
    </View>
  );
};

export default App;


*/